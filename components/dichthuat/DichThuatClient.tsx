"use client";

import { useState } from "react";

type Direction = "vi-ko" | "ko-vi";

const LABELS: Record<Direction, { source: string; target: string; sourceLang: string; targetLang: string }> = {
  "vi-ko": { source: "Tiếng Việt", target: "Tiếng Hàn", sourceLang: "vi-VN", targetLang: "ko-KR" },
  "ko-vi": { source: "Tiếng Hàn", target: "Tiếng Việt", sourceLang: "ko-KR", targetLang: "vi-VN" },
};

function speak(text: string, lang: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  window.speechSynthesis.speak(utter);
}

export default function DichThuatClient() {
  const [direction, setDirection] = useState<Direction>("vi-ko");
  const [input, setInput] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labels = LABELS[direction];

  function swap() {
    setDirection((d) => (d === "vi-ko" ? "ko-vi" : "vi-ko"));
    setInput(translated);
    setTranslated("");
    setError(null);
  }

  async function handleTranslate() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, direction }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Đã có lỗi xảy ra. Vui lòng thử lại.");
        setTranslated("");
        return;
      }
      setTranslated(data.translated as string);
    } catch {
      setError("Không kết nối được. Vui lòng kiểm tra mạng và thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="paper-card p-4 flex items-center justify-between gap-3">
        <span className="font-bold text-navy">{labels.source}</span>
        <button
          type="button"
          onClick={swap}
          aria-label="Đảo chiều dịch"
          className="shrink-0 seal-mark h-10 w-10 text-lg transition-transform hover:rotate-180"
        >
          ⇄
        </button>
        <span className="font-bold text-navy">{labels.target}</span>
      </div>

      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder={
            direction === "vi-ko"
              ? "Nhập tiếng Việt cần dịch..."
              : "한국어를 입력하세요..."
          }
          className="w-full rounded-lg border px-4 py-3 text-base bg-white/60"
          style={{ borderColor: "color-mix(in srgb, var(--ink) 18%, transparent)" }}
        />
        <button
          type="button"
          onClick={handleTranslate}
          disabled={loading || !input.trim()}
          className="mt-3 w-full rounded-lg px-4 py-3 font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "var(--seal)" }}
        >
          {loading ? "Đang dịch..." : "Dịch"}
        </button>
      </div>

      {error && (
        <div
          className="paper-card p-4 text-sm font-medium text-seal"
          style={{ borderColor: "color-mix(in srgb, var(--seal) 40%, transparent)" }}
        >
          ⚠️ {error}
        </div>
      )}

      {translated && (
        <div className="paper-card p-5">
          <p className="text-xs font-mono text-ink/50 mb-2">{labels.target}</p>
          <p className="text-xl font-bold text-navy leading-relaxed">{translated}</p>
          <button
            type="button"
            onClick={() => speak(translated, labels.targetLang)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
            style={{ borderColor: "color-mix(in srgb, var(--navy) 30%, transparent)" }}
          >
            🔊 Đọc to cho người kia nghe
          </button>
        </div>
      )}
    </div>
  );
}
