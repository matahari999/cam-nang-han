"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  isDigitalGoodsAvailable,
  getItemDetails,
  getExistingPurchases,
  purchaseSubscription,
} from "@/lib/billing/digital-goods-client";
import { PREMIUM_PRODUCT_ID } from "@/lib/billing/products";

type ItemDetails = {
  itemId: string;
  title: string;
  description: string;
  price: { currency: string; value: string };
  subscriptionPeriod?: string;
};

type Status = {
  loggedIn: boolean;
  entitled: boolean;
  status: string | null;
  expiresAt: string | null;
};

type Props = {
  loggedIn: boolean;
};

export default function ThanhVienClient({ loggedIn }: Props) {
  const router = useRouter();
  const [inTwa, setInTwa] = useState(false);
  const [item, setItem] = useState<ItemDetails | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInTwa(isDigitalGoodsAvailable());
    refreshStatus();
    if (isDigitalGoodsAvailable()) {
      getItemDetails([PREMIUM_PRODUCT_ID]).then((items) => {
        if (items[0]) setItem(items[0]);
      });
    }
  }, []);

  async function refreshStatus() {
    try {
      const res = await fetch("/api/billing/status");
      const data = (await res.json()) as Status;
      setStatus(data);
    } catch {
      // 네트워크 오류 시 조용히 무시 — 아래 UI는 "미확인" 상태로 표시됨
    }
  }

  async function handlePurchase() {
    if (!loggedIn) {
      router.push("/login");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const purchaseToken = await purchaseSubscription(PREMIUM_PRODUCT_ID);
      const res = await fetch("/api/billing/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "PURCHASE_VERIFY_FAILED");
      await refreshStatus();
    } catch (err) {
      if (err instanceof Error && err.message === "NOT_SUPPORTED") {
        setError("Vui lòng mở ứng dụng Cẩm Nang Hàn từ Google Play để đăng ký gói.");
      } else {
        setError("Không hoàn tất được thanh toán. Vui lòng thử lại.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleRestore() {
    setBusy(true);
    setError(null);
    try {
      const purchases = await getExistingPurchases();
      const existing = purchases.find((p) => p.itemId === PREMIUM_PRODUCT_ID);
      if (!existing) {
        setError("Không tìm thấy giao dịch nào để khôi phục trên tài khoản Google Play này.");
        return;
      }
      const res = await fetch("/api/billing/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseToken: existing.purchaseToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "RESTORE_FAILED");
      await refreshStatus();
    } catch {
      setError("Không khôi phục được giao dịch. Vui lòng thử lại.");
    } finally {
      setBusy(false);
    }
  }

  if (status?.entitled) {
    return (
      <div className="paper-card p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="seal-mark h-9 w-9 text-sm">✓</span>
          <h2 className="text-lg font-bold text-ink">Bạn đang là thành viên</h2>
        </div>
        <p className="text-sm text-ink/70 leading-relaxed">
          {status.expiresAt
            ? `Gia hạn tiếp theo: ${new Date(status.expiresAt).toLocaleDateString("vi-VN")}`
            : "Cảm ơn bạn đã ủng hộ Cẩm Nang Hàn!"}
        </p>
      </div>
    );
  }

  return (
    <div className="paper-card p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="seal-mark h-9 w-9 text-sm">★</span>
        <h2 className="text-lg font-bold text-ink">Gói thành viên</h2>
      </div>

      {item ? (
        <p className="text-2xl font-extrabold text-navy mb-1">
          {item.price.value} {item.price.currency}
          <span className="text-sm font-medium text-ink/60"> / tháng</span>
        </p>
      ) : (
        <p className="text-sm text-ink/60 mb-1">Giá sẽ hiển thị khi mở trong ứng dụng.</p>
      )}

      <p className="text-sm text-ink/70 leading-relaxed mb-4">
        Ủng hộ Cẩm Nang Hàn để duy trì và phát triển thêm tính năng mới —
        không quảng cáo, không giới hạn tính năng.
      </p>

      {!inTwa && (
        <p className="mb-4 rounded-lg p-3 text-xs text-ink/70" style={{ backgroundColor: "color-mix(in srgb, var(--gold) 12%, transparent)" }}>
          Thanh toán chỉ khả dụng trong ứng dụng Cẩm Nang Hàn tải từ Google Play (không dùng được trên trình duyệt web).
        </p>
      )}

      {error && (
        <p className="mb-4 text-sm font-medium" style={{ color: "var(--seal)" }}>
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={handlePurchase}
          disabled={busy || !inTwa}
          className="flex-1 rounded-lg px-4 py-2.5 font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: "var(--seal)" }}
        >
          {busy ? "Đang xử lý..." : "Đăng ký ngay"}
        </button>
        <button
          type="button"
          onClick={handleRestore}
          disabled={busy || !inTwa}
          className="rounded-lg border px-4 py-2.5 font-semibold text-navy transition-colors hover:bg-navy/5 disabled:opacity-60"
          style={{ borderColor: "color-mix(in srgb, var(--navy) 30%, transparent)" }}
        >
          Khôi phục giao dịch
        </button>
      </div>
    </div>
  );
}
