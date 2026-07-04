"use client";

import { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: any;
  }
}

const SDK_TIMEOUT_MS = 8000;

export type KakaoSdkStatus = "loading" | "ready" | "failed";

export function useKakaoMapsSdk(): KakaoSdkStatus {
  const [status, setStatus] = useState<KakaoSdkStatus>("loading");

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!key) {
      setStatus("failed");
      return;
    }
    if (window.kakao?.maps) {
      setStatus("ready");
      return;
    }

    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) setStatus("failed");
    }, SDK_TIMEOUT_MS);

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (cancelled) return;
      window.kakao.maps.load(() => {
        clearTimeout(timeout);
        if (!cancelled) setStatus("ready");
      });
    };
    script.onerror = () => {
      clearTimeout(timeout);
      if (!cancelled) setStatus("failed");
    };
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return status;
}
