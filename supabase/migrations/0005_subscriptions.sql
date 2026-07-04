-- Cẩm Nang Hàn: Google Play 구독 상태 저장
-- 쓰기는 서버(서비스 롤)에서만 수행 — Play Developer API로 purchaseToken을 검증한 뒤 upsert.
-- 일반 사용자에게는 insert/update 정책을 주지 않는다 (본인 행 조회만 허용).

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  platform text not null default 'google_play',
  product_id text not null,                 -- Play Console 구독 상품 ID (예: premium_monthly)
  purchase_token text not null unique,      -- Play Billing purchaseToken (기기/재구매마다 갱신)
  status text not null default 'active',    -- active | canceled | expired | paused | on_hold
  expires_at timestamptz,                   -- lineItems[].expiryTime (자동갱신 구독의 다음 만료 시각)
  acknowledged boolean not null default false,
  raw jsonb,                                -- Play API 원본 응답 (디버깅용)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index subscriptions_user_idx on public.subscriptions(user_id);

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- insert/update/delete 정책 없음: 서비스 롤(RLS 우회)로만 쓴다.

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();
