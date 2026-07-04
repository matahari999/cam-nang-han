"use client";

import { useRef, useState } from "react";
import type { DocumentInterpretation } from "@/lib/gemini";

type Status = "idle" | "loading" | "done" | "error";

export default function QuetGiayToClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DocumentInterpretation | null>(null);

  function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    setError(null);
    setResult(null);
    setStatus("idle");
    setFile(picked);
    setPreviewUrl(picked ? URL.createObjectURL(picked) : null);
  }

  function reset() {
    setFile(null);
    setPreviewUrl(null);
    setStatus("idle");
    setError(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleSubmit() {
    if (!file) return;
    setStatus("loading");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/quet-giay-to", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Đã có lỗi xảy ra. Vui lòng thử lại.");
        setStatus("error");
        return;
      }
      setResult(data as DocumentInterpretation);
      setStatus("done");
    } catch {
      setError("Không kết nối được. Vui lòng kiểm tra mạng và thử lại.");
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        className="paper-card p-4 text-xs leading-relaxed text-ink/70"
        style={{ borderColor: "color-mix(in srgb, var(--navy) 25%, transparent)" }}
      >
        🔒 Ảnh của bạn <span className="font-semibold text-navy">không được lưu trữ</span> —
        chỉ dùng để phân tích rồi xóa ngay lập tức. Đây là công cụ AI tham khảo, có thể sai sót —
        hãy xác nhận lại với công ty/cơ quan nếu liên quan đến số tiền hoặc hạn chót quan trọng.
      </div>

      {!previewUrl && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="paper-card flex flex-col items-center justify-center gap-3 p-10 text-center transition-transform hover:-translate-y-0.5"
          style={{ borderStyle: "dashed", borderWidth: 2 }}
        >
          <span className="seal-mark h-14 w-14 text-2xl">📷</span>
          <span className="font-bold text-navy">Chụp ảnh hoặc chọn ảnh giấy tờ</span>
          <span className="text-xs text-ink/60">
            Bảng lương, thư cơ quan, hóa đơn, hợp đồng... (JPG/PNG, tối đa 8MB)
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePick}
        className="hidden"
      />

      {previewUrl && (
        <div className="paper-card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Ảnh giấy tờ đã chọn"
            className="max-h-80 w-full object-contain bg-black/5"
          />
          <div className="flex gap-2 p-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="flex-1 rounded-lg px-4 py-2.5 font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "var(--seal)" }}
            >
              {status === "loading" ? "Đang đọc giấy tờ..." : "Giải thích giấy tờ này"}
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={status === "loading"}
              className="rounded-lg border px-4 py-2.5 font-semibold text-navy transition-colors hover:bg-navy/5 disabled:opacity-60"
              style={{ borderColor: "color-mix(in srgb, var(--navy) 30%, transparent)" }}
            >
              Chọn ảnh khác
            </button>
          </div>
        </div>
      )}

      {error && (
        <div
          className="paper-card p-4 text-sm font-medium text-seal"
          style={{ borderColor: "color-mix(in srgb, var(--seal) 40%, transparent)" }}
        >
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="flex flex-col gap-4">
          <div className="paper-card p-5">
            <p className="text-xs font-mono text-ink/50 mb-1">Loại giấy tờ</p>
            <h2 className="text-lg font-bold text-navy mb-3">{result.docType}</h2>
            <p className="text-sm leading-relaxed text-ink/80">{result.summary}</p>
          </div>

          {result.items.length > 0 && (
            <div className="flex flex-col gap-2.5">
              {result.items.map((item, i) => (
                <div key={i} className="paper-card p-4">
                  <p className="font-mono text-xs font-semibold text-navy mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed text-ink/80">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}

          {result.notes && (
            <div
              className="paper-card p-4 text-sm leading-relaxed text-ink/80"
              style={{ borderColor: "color-mix(in srgb, var(--gold) 50%, transparent)" }}
            >
              <span className="font-bold text-navy">📌 Lưu ý: </span>
              {result.notes}
            </div>
          )}

          <button
            type="button"
            onClick={reset}
            className="rounded-lg border px-4 py-2.5 font-semibold text-navy transition-colors hover:bg-navy/5"
            style={{ borderColor: "color-mix(in srgb, var(--navy) 30%, transparent)" }}
          >
            Quét giấy tờ khác
          </button>
        </div>
      )}
    </div>
  );
}
