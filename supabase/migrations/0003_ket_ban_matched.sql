-- Trả về danh sách người đã "kết nối" (cả hai bên đều gửi lời chào cho nhau)
create or replace function public.matched_friends(my_user_id uuid)
returns table (
  id uuid,
  display_name text,
  bio text,
  connected_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    p.id,
    p.display_name,
    p.bio,
    greatest(a.created_at, b.created_at) as connected_at
  from public.friend_greetings a
  join public.friend_greetings b
    on a.from_id = b.to_id and a.to_id = b.from_id
  join public.profiles p
    on p.id = a.to_id
  where a.from_id = my_user_id
  order by connected_at desc;
$$;

grant execute on function public.matched_friends(uuid) to authenticated;
