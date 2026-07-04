-- Cẩm Nang Hàn: thêm tọa độ đã làm mờ (fuzzy) vào nearby_friends để hiển thị ghim gần đúng trên bản đồ
-- Không bao giờ trả tọa độ thật của người khác — cộng thêm độ lệch ngẫu nhiên 100-300m theo
-- hướng ngẫu nhiên MỖI LẦN GỌI, để không ai có thể dò ra vị trí nhà/nơi làm việc thật bằng
-- cách gọi lặp lại nhiều lần hoặc từ nhiều điểm quan sát khác nhau.

drop function if exists public.nearby_friends(double precision, double precision, uuid, double precision);

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
  last_seen timestamptz,
  fuzzy_lat double precision,
  fuzzy_lng double precision
)
language sql
security definer
set search_path = public
as $$
  select id, display_name, bio, distance_km, last_seen, fuzzy_lat, fuzzy_lng
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
      p.last_seen,
      p.lat + (r.offset_km / 111.32) * cos(r.bearing) as fuzzy_lat,
      p.lng + (r.offset_km / (111.32 * cos(radians(p.lat)))) * sin(r.bearing) as fuzzy_lng
    from public.profiles p
    cross join lateral (
      select
        random() * 2 * pi() as bearing,
        (0.1 + random() * 0.2) as offset_km -- 100m~300m
    ) r
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
