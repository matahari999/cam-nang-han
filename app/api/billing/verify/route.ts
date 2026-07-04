import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getSubscriptionPurchase,
  acknowledgeSubscription,
  mapPlayState,
} from "@/lib/googleplay";
import { isEntitled } from "@/lib/billing/entitlement";

export const runtime = "nodejs";

// TWA 안에서 결제 완료 직후(또는 "구매 복원" 시) purchaseToken을 받아
// Google Play Developer API로 진위를 확인한 뒤 subscriptions에 upsert한다.
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: "Vui lòng đăng nhập trước khi đăng ký gói." },
      { status: 401 }
    );
  }

  let purchaseToken: string;
  try {
    const body = (await request.json()) as { purchaseToken?: string };
    purchaseToken = String(body.purchaseToken ?? "");
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }
  if (!purchaseToken) {
    return NextResponse.json({ error: "Thiếu purchaseToken." }, { status: 400 });
  }

  try {
    const purchase = await getSubscriptionPurchase(purchaseToken);
    if (!purchase || !purchase.lineItems?.length) {
      return NextResponse.json(
        { error: "Không xác minh được giao dịch với Google Play." },
        { status: 400 }
      );
    }

    const productId = purchase.lineItems[0].productId;
    const expiryTime = purchase.lineItems[0].expiryTime ?? null;
    const status = mapPlayState(purchase.subscriptionState);

    // 미승인 상태면 acknowledge (3일 내 미승인 시 Google이 자동 환불)
    if (purchase.acknowledgementState === "ACKNOWLEDGEMENT_STATE_PENDING") {
      await acknowledgeSubscription(productId, purchaseToken);
    }

    const admin = createAdminClient();
    const { error: upsertError } = await admin.from("subscriptions").upsert(
      {
        user_id: user.id,
        platform: "google_play",
        product_id: productId,
        purchase_token: purchaseToken,
        status,
        expires_at: expiryTime,
        acknowledged: true,
        raw: purchase.raw,
      },
      { onConflict: "user_id,product_id" }
    );
    if (upsertError) throw upsertError;

    const entitled = isEntitled({ product_id: productId, status, expires_at: expiryTime });
    return NextResponse.json({ entitled, status, productId, expiresAt: expiryTime });
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message === "MISSING_PLAY_SERVICE_ACCOUNT" ||
        err.message === "MISSING_SERVICE_ROLE_KEY")
    ) {
      return NextResponse.json(
        { error: "Tính năng thanh toán chưa được cấu hình. Vui lòng quay lại sau." },
        { status: 503 }
      );
    }
    console.error("[billing/verify]", err);
    return NextResponse.json(
      { error: "Không xác minh được giao dịch. Vui lòng thử lại." },
      { status: 502 }
    );
  }
}
