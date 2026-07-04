import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isEntitled } from "@/lib/billing/entitlement";

export const runtime = "nodejs";

// 현재 로그인 사용자의 구독 상태 조회 (RLS: 본인 행만 보임)
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ entitled: false, loggedIn: false });
  }

  const { data } = await supabase
    .from("subscriptions")
    .select("product_id,status,expires_at")
    .eq("user_id", user.id)
    .order("expires_at", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({
    loggedIn: true,
    entitled: isEntitled(data),
    status: data?.status ?? null,
    productId: data?.product_id ?? null,
    expiresAt: data?.expires_at ?? null,
  });
}
