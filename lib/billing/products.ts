// Google Play Console(수익 창출 > 구독)에 만드는 구독 상품 ID와 반드시 일치해야 함.
// 가격은 코드에 두지 않는다 — Play Console에서 설정하고, 클라이언트가
// Digital Goods API getDetails()로 현지 통화 가격을 받아와 표시한다.
export const PREMIUM_PRODUCT_ID = "premium_monthly";

export const ALL_PRODUCT_IDS = [PREMIUM_PRODUCT_ID] as const;

export const ANDROID_PACKAGE_NAME = "com.camnanghan.app";

export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;
