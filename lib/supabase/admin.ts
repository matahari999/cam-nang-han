import { createClient } from "@supabase/supabase-js";

// 서비스 롤 클라이언트 — RLS를 우회하므로 서버 코드에서만 import할 것.
// subscriptions 테이블처럼 "서버 검증 후에만 쓰기" 정책인 테이블에 사용.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("MISSING_SERVICE_ROLE_KEY");
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
