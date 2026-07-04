"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // Chỉ đăng ký trên production để không phá cache khi dev
    if (process.env.NODE_ENV !== "production") return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Đăng ký thất bại thì trang vẫn hoạt động bình thường (chỉ mất offline)
    });
  }, []);

  return null;
}
