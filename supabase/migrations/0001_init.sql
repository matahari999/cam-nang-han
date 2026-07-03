-- Cẩm Nang Hàn: 유저 인증 + 체크리스트 완료 상태 저장 스키마
-- auth.users는 Supabase Auth가 관리 (이메일/소셜 로그인 등)

-- 1. 프로필 (auth.users 1:1 확장)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_language text not null default 'vi',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_upsert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- 신규 가입 시 profiles 행 자동 생성
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. 체크리스트 진행 상태
-- situation_slug는 lib/checklists.ts의 Situation.slug와 대응 (앱 코드가 정본, DB는 FK 없이 텍스트로 참조)
create table public.checklist_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  situation_slug text not null,
  checked_items text[] not null default '{}',  -- 체크된 item.label 목록
  completed_at timestamptz,                     -- 전체 완료 시각 (모든 항목 체크 시 설정)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, situation_slug)
);

create index checklist_progress_user_idx on public.checklist_progress(user_id);

alter table public.checklist_progress enable row level security;

create policy "checklist_progress_select_own"
  on public.checklist_progress for select
  using (auth.uid() = user_id);

create policy "checklist_progress_insert_own"
  on public.checklist_progress for insert
  with check (auth.uid() = user_id);

create policy "checklist_progress_update_own"
  on public.checklist_progress for update
  using (auth.uid() = user_id);

create policy "checklist_progress_delete_own"
  on public.checklist_progress for delete
  using (auth.uid() = user_id);

-- updated_at 자동 갱신
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger checklist_progress_set_updated_at
  before update on public.checklist_progress
  for each row execute function public.set_updated_at();

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
