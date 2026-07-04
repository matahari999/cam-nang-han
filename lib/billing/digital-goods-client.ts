"use client";

// TWA(Trusted Web Activity) 안에서만 동작하는 Digital Goods API 래퍼.
// 참고: https://github.com/GoogleChromeLabs/digital-goods-api
// 일반 브라우저(PC/모바일 웹)에서는 window.getDigitalGoodsService가 없어 전부 null/false 반환 —
// 호출부는 반드시 isAvailable()로 먼저 분기해야 한다.

declare global {
  interface Window {
    getDigitalGoodsService?: (serviceProvider: string) => Promise<DigitalGoodsService>;
  }
}

type ItemDetails = {
  itemId: string;
  title: string;
  description: string;
  price: { currency: string; value: string };
  subscriptionPeriod?: string;
};

type PurchaseDetails = {
  itemId: string;
  purchaseToken: string;
};

type DigitalGoodsService = {
  getDetails(itemIds: string[]): Promise<ItemDetails[]>;
  listPurchases(): Promise<PurchaseDetails[]>;
  listPurchaseHistory?(): Promise<PurchaseDetails[]>;
  consume?(purchaseToken: string): Promise<void>;
};

const SERVICE_PROVIDER = "https://play.google.com/billing";

export function isDigitalGoodsAvailable(): boolean {
  return typeof window !== "undefined" && "getDigitalGoodsService" in window;
}

async function getService(): Promise<DigitalGoodsService | null> {
  if (!isDigitalGoodsAvailable()) return null;
  try {
    return await window.getDigitalGoodsService!(SERVICE_PROVIDER);
  } catch {
    // Play Store 앱이 없거나(APK 미설치) 지원 안 하는 환경
    return null;
  }
}

export async function getItemDetails(itemIds: string[]): Promise<ItemDetails[]> {
  const service = await getService();
  if (!service) return [];
  return service.getDetails(itemIds);
}

export async function getExistingPurchases(): Promise<PurchaseDetails[]> {
  const service = await getService();
  if (!service) return [];
  return service.listPurchases();
}

// PaymentRequest API로 실제 구매 플로우를 연다.
// 반환값은 purchaseToken — 이걸 서버(/api/billing/verify)로 보내 검증해야 실제 지급 확정.
export async function purchaseSubscription(itemId: string): Promise<string> {
  if (!isDigitalGoodsAvailable()) {
    throw new Error("NOT_SUPPORTED");
  }
  const supportedInstruments = [
    { supportedMethods: SERVICE_PROVIDER, data: { itemId } },
  ];
  const details = {
    total: {
      label: "Total",
      amount: { currency: "USD", value: "0" }, // Play가 실제 가격/통화를 자체 표시하므로 더미 값
    },
  };
  const request = new PaymentRequest(supportedInstruments, details);
  const response = await request.show();
  await response.complete("success");
  const purchaseToken = (response.details as { purchaseToken?: string })?.purchaseToken;
  if (!purchaseToken) throw new Error("NO_PURCHASE_TOKEN");
  return purchaseToken;
}
