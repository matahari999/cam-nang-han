"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { checklists, categories } from "@/lib/checklists";

function normalize(text: string): string {
  // Bo dau tieng Viet de tim kiem khong can go dau
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}

export default function ChecklistBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return checklists.filter((s) => {
      if (category && s.category !== category) return false;
      if (!q) return true;
      const haystack = normalize(
        `${s.title} ${s.short} ${s.items.map((i) => i.label).join(" ")}`
      );
      return haystack.includes(q);
    });
  }, [query, category]);

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="checklist-search" className="sr-only">
          Tìm kiếm tình huống
        </label>
        <input
          id="checklist-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm: khám bệnh, visa, thuê nhà, nợ lương..."
          className="w-full rounded-lg border px-4 py-3 text-sm bg-white/60 placeholder:text-ink/40 focus:outline-none focus:ring-2"
          style={{
            borderColor: "color-mix(in srgb, var(--ink) 18%, transparent)",
          }}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
          style={
            category === null
              ? {
                  backgroundColor: "var(--navy)",
                  borderColor: "var(--navy)",
                  color: "var(--paper)",
                }
              : {
                  borderColor:
                    "color-mix(in srgb, var(--navy) 30%, transparent)",
                  color: "var(--navy)",
                }
          }
        >
          Tất cả
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(category === c.id ? null : c.id)}
            className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
            style={
              category === c.id
                ? {
                    backgroundColor: "var(--navy)",
                    borderColor: "var(--navy)",
                    color: "var(--paper)",
                  }
                : {
                    borderColor:
                      "color-mix(in srgb, var(--navy) 30%, transparent)",
                    color: "var(--navy)",
                  }
            }
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="paper-card p-8 text-center">
          <p className="text-sm text-ink/60">
            Không tìm thấy tình huống phù hợp với &ldquo;{query}&rdquo;.
          </p>
          <p className="text-xs text-ink/50 mt-2">
            Thử từ khóa khác, hoặc gọi 1345 (có tiếng Việt) để được tư vấn trực
            tiếp.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((s) => (
            <Link
              key={s.slug}
              href={`/cam-nang/${s.slug}`}
              className="paper-card p-5 flex flex-col gap-2 transition-transform hover:-translate-y-0.5"
            >
              <span className="text-3xl" aria-hidden>
                {s.emoji}
              </span>
              <span className="font-bold text-ink">{s.title}</span>
              <span className="text-sm text-ink/65 leading-relaxed">
                {s.short}
              </span>
              <span className="mt-1 font-mono text-xs text-seal">
                {s.items.length} mục cần chuẩn bị →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
