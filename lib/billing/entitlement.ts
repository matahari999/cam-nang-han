// 구독 행(subscriptions 테이블)에서 "지금 프리미엄인가"를 판정.
// canceled여도 만료 시각 전까지는 이용 가능(Google Play 정책과 동일).
export type SubscriptionRow = {
  product_id: string;
  status: string;
  expires_at: string | null;
};

export function isEntitled(sub: SubscriptionRow | null | undefined): boolean {
  if (!sub) return false;
  if (sub.status === "expired") return false;
  if (!sub.expires_at) return sub.status === "active";
  return new Date(sub.expires_at).getTime() > Date.now();
}
