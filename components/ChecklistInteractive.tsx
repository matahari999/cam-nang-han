"use client";

import { useState } from "react";
import type { Situation } from "@/lib/checklists";

export default function ChecklistInteractive({
  situation,
}: {
  situation: Situation;
}) {
  const [checked, setChecked] = useState<boolean[]>(
    () => situation.items.map(() => false)
  );
  const [openWhy, setOpenWhy] = useState<boolean[]>(
    () => situation.items.map(() => false)
  );

  const doneCount = checked.filter(Boolean).length;
  const total = situation.items.length;
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  function toggleCheck(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  function toggleWhy(i: number) {
    setOpenWhy((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div>
      <div className="paper-card p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-navy">
            Tiến độ chuẩn bị
          </span>
          <span className="font-mono text-sm font-semibold text-seal">
            {doneCount}/{total} · {percent}%
          </span>
        </div>
        <div
          className="h-3 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: "color-mix(in srgb, var(--ink) 10%, transparent)" }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${percent}%`, backgroundColor: "var(--seal)" }}
          />
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {situation.items.map((item, i) => {
          const isChecked = checked[i];
          const isWhyOpen = openWhy[i];
          return (
            <li key={i} className="paper-card p-4">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleCheck(i)}
                  aria-pressed={isChecked}
                  aria-label={
                    isChecked ? "Bỏ đánh dấu mục này" : "Đánh dấu đã chuẩn bị"
                  }
                  className="seal-mark mt-0.5 h-7 w-7 text-sm transition-colors"
                  style={
                    isChecked
                      ? { backgroundColor: "var(--seal)", color: "var(--paper)" }
                      : undefined
                  }
                >
                  {isChecked ? "✓" : ""}
                </button>

                <div className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => toggleWhy(i)}
                    className="text-left w-full"
                    aria-expanded={isWhyOpen}
                  >
                    <span
                      className={`font-semibold text-ink ${
                        isChecked ? "line-through opacity-60" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="ml-2 text-xs font-medium text-navy underline underline-offset-2">
                      {isWhyOpen ? "Ẩn lý do" : "Tại sao cần?"}
                    </span>
                  </button>

                  {isWhyOpen && (
                    <p className="mt-2 text-sm leading-relaxed text-ink/80">
                      {item.why}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {situation.tip && (
        <div
          className="mt-6 rounded-lg p-4 border"
          style={{
            borderColor: "color-mix(in srgb, var(--gold) 45%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--gold) 10%, transparent)",
          }}
        >
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold text-gold">Mẹo: </span>
            {situation.tip}
          </p>
        </div>
      )}
    </div>
  );
}
