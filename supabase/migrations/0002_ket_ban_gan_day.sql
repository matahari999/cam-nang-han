-- Cẩm Nang Hàn: "Kết bạn gần bạn" — kết nối với người Việt gần bạn để bớt cô đơn khi xa nhà
-- Opt-in: mặc định KHÔNG hiển thị vị trí, người dùng phải tự bật visible_nearby

alter table public.profiles
  add column bio text,
  add column lat double precision,
  add column lng double precision,
  add column last_seen timestamptz,
  add column visible_nearby boolean not null default false;

-- Lời chào gửi cho nhau (tương đương "like")
create table public.friend_greetings (
  id uuid primary key default gen_random_uuid(),
  from_id uuid not null references auth.users(id) on delete cascade,
  to_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (from_id, to_id)
);

create index friend_greetings_to_idx on public.friend_greetings(to_id);

alter table public.friend_greetings enable row level security;

-- Chỉ xem lời chào mình gửi hoặc nhận (cần cả hai chiều để tính "đã kết nối")
create policy "friend_greetings_select_own"
  on public.friend_greetings for select
  using (auth.uid() = from_id or auth.uid() = to_id);

create policy "friend_greetings_insert_own"
  on public.friend_greetings for insert
  with check (auth.uid() = from_id);

create policy "friend_greetings_delete_own"
  on public.friend_greetings for delete
  using (auth.uid() = from_id);

-- Tìm người gần bạn đã bật visible_nearby, còn hoạt động trong 24 giờ qua
-- security definer: bỏ qua RLS của profiles (vốn chỉ cho xem hồ sơ của chính mình)
-- nhưng CHỈ trả về các trường an toàn (không trả lat/lng chính xác của người khác)
create or replace function public.nearby_friends(
  my_lat double precision,
  my_lng double precision,
  my_user_id uuid,
  radius_km double precision default 15
)
returns table (
  id uuid,
  display_name text,
  bio text,
  distance_km double precision,
  last_seen timestamptz
)
language sql
security definer
set search_path = public
as $$
  select id, display_name, bio, distance_km, last_seen
  from (
    select
      p.id,
      p.display_name,
      p.bio,
      (
        6371 * acos(
          least(1.0, greatest(-1.0,
            cos(radians(my_lat)) * cos(radians(p.lat)) *
            cos(radians(p.lng) - radians(my_lng)) +
            sin(radians(my_lat)) * sin(radians(p.lat))
          ))
        )
      ) as distance_km,
      p.last_seen
    from public.profiles p
    where p.visible_nearby = true
      and p.id != my_user_id
      and p.lat is not null
      and p.lng is not null
      and p.last_seen > now() - interval '24 hours'
  ) nearby
  where distance_km <= radius_km
  order by distance_km asc
  limit 30;
$$;

grant execute on function public.nearby_friends(double precision, double precision, uuid, double precision) to authenticated;
