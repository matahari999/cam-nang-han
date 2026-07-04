import { createSign } from "node:crypto";
import { ANDROID_PACKAGE_NAME } from "@/lib/billing/products";

// Google Play Developer API로 구독 purchaseToken을 검증/승인(acknowledge)한다.
// 필요 환경변수: GOOGLE_PLAY_SERVICE_ACCOUNT_JSON
//   — Play Console에 연결된 GCP 서비스 계정 키 JSON 전체 문자열.
//   서비스 계정에 Play Console "재무 데이터 보기 + 주문 관리" 권한 필요.

type ServiceAccount = { client_email: string; private_key: string };

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/androidpublisher";
const API_BASE = "https://androidpublisher.googleapis.com/androidpublisher/v3";

let cachedToken: { token: string; expiresAt: number } | null = null;

function loadServiceAccount(): ServiceAccount {
  const raw = process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("MISSING_PLAY_SERVICE_ACCOUNT");
  const parsed = JSON.parse(raw) as ServiceAccount;
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("MISSING_PLAY_SERVICE_ACCOUNT");
  }
  return parsed;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }
  const sa = loadServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = base64url(signer.sign(sa.private_key));
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`PLAY_TOKEN_FAILED:${res.status}`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: json.access_token,
    expiresAt: Date.now() + json.expires_in * 1000,
  };
  return json.access_token;
}

// subscriptionsv2 응답에서 우리가 쓰는 필드만 추린 타입
export type PlaySubscription = {
  subscriptionState: string; // SUBSCRIPTION_STATE_ACTIVE 등
  acknowledgementState: string; // ACKNOWLEDGEMENT_STATE_PENDING | _ACKNOWLEDGED
  lineItems?: { productId: string; expiryTime?: string }[];
  raw: unknown;
};

export async function getSubscriptionPurchase(
  purchaseToken: string
): Promise<PlaySubscription | null> {
  const token = await getAccessToken();
  const res = await fetch(
    `${API_BASE}/applications/${ANDROID_PACKAGE_NAME}/purchases/subscriptionsv2/tokens/${encodeURIComponent(purchaseToken)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (res.status === 404 || res.status === 400) return null; // 존재하지 않는/잘못된 토큰
  if (!res.ok) throw new Error(`PLAY_GET_FAILED:${res.status}`);
  const json = (await res.json()) as Record<string, unknown>;
  return {
    subscriptionState: String(json.subscriptionState ?? ""),
    acknowledgementState: String(json.acknowledgementState ?? ""),
    lineItems: json.lineItems as PlaySubscription["lineItems"],
    raw: json,
  };
}

export async function acknowledgeSubscription(
  productId: string,
  purchaseToken: string
): Promise<void> {
  const token = await getAccessToken();
  const res = await fetch(
    `${API_BASE}/applications/${ANDROID_PACKAGE_NAME}/purchases/subscriptions/${encodeURIComponent(productId)}/tokens/${encodeURIComponent(purchaseToken)}:acknowledge`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
  // 이미 acknowledge된 토큰이면 400이 올 수 있음 — 치명적이지 않으므로 무시
  if (!res.ok && res.status !== 400) {
    throw new Error(`PLAY_ACK_FAILED:${res.status}`);
  }
}

// Play 구독 상태 → subscriptions.status 값 매핑
export function mapPlayState(state: string): string {
  switch (state) {
    case "SUBSCRIPTION_STATE_ACTIVE":
    case "SUBSCRIPTION_STATE_IN_GRACE_PERIOD":
      return "active";
    case "SUBSCRIPTION_STATE_CANCELED":
      return "canceled";
    case "SUBSCRIPTION_STATE_ON_HOLD":
      return "on_hold";
    case "SUBSCRIPTION_STATE_PAUSED":
      return "paused";
    case "SUBSCRIPTION_STATE_EXPIRED":
      return "expired";
    default:
      return "expired";
  }
}
