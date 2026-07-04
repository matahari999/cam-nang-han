"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "cnh-install-dismissed";

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [showIosHint, setShowIosHint] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    if (isIos()) {
      setShowIosHint(true);
      setVisible(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible) return null;

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setVisible(false);
    setDeferred(null);
  }

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  return (
    <div
      className="paper-card p-4 mb-6 flex flex-wrap items-center gap-3"
      style={{
        borderColor: "color-mix(in srgb, var(--seal) 35%, transparent)",
      }}
    >
      <span className="seal-mark h-9 w-9 text-base shrink-0">📲</span>
      <div className="flex-1 min-w-[12rem]">
        <p className="text-sm font-bold text-ink">
          Cài Cẩm Nang Hàn vào điện thoại
        </p>
        <p className="text-xs text-ink/65 mt-0.5 leading-relaxed">
          {showIosHint ? (
            <>
              Trên iPhone: bấm nút <span className="font-semibold">Chia sẻ</span>{" "}
              (ô vuông có mũi tên) rồi chọn{" "}
              <span className="font-semibold">
                &ldquo;Thêm vào MH chính&rdquo;
              </span>
              . Dùng như app thật, xem được cả khi mất mạng.
            </>
          ) : (
            <>Dùng như app thật — mở nhanh, xem được cả khi mất mạng.</>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {!showIosHint && (
          <button
            type="button"
            onClick={install}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--seal)" }}
          >
            Cài đặt
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Đóng"
          className="rounded-lg px-3 py-2 text-sm font-semibold text-ink/50 hover:text-ink"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
