"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Situation } from "@/lib/checklists";
import { createClient } from "@/lib/supabase/client";

export default function ChecklistInteractive({
  situation,
}: {
  situation: Situation;
}) {
  const [supabase] = useState(() => createClient());

  const [checked, setChecked] = useState<boolean[]>(
    () => situation.items.map(() => false)
  );
  const [openWhy, setOpenWhy] = useState<boolean[]>(
    () => situation.items.map(() => false)
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      if (!user) {
        setAuthResolved(true);
        return;
      }
      setUserId(user.id);

      const { data } = await supabase
        .from("checklist_progress")
        .select("checked_items")
        .eq("user_id", user.id)
        .eq("situation_slug", situation.slug)
        .maybeSingle();

      if (!active) return;

      if (data?.checked_items) {
        const savedLabels = new Set(data.checked_items);
        setChecked(situation.items.map((item) => savedLabels.has(item.label)));
      }
      setAuthResolved(true);
    }

    load();
    return () => {
      active = false;
    };
  }, [supabase, situation]);

  const doneCount = checked.filter(Boolean).length;
  const total = situation.items.length;
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  async function persist(nextChecked: boolean[]) {
    if (!userId) return;

    const checkedLabels = situation.items
      .filter((_, i) => nextChecked[i])
      .map((item) => item.label);
    const allDone =
      total > 0 && checkedLabels.length === total;

    const { error } = await supabase.from("checklist_progress").upsert(
      {
        user_id: userId,
        situation_slug: situation.slug,
        checked_items: checkedLabels,
        completed_at: allDone ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,situation_slug" }
    );

    setSaveError(error ? "Không lưu được tiến độ. Vui lòng thử lại." : null);
  }

  function toggleCheck(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      void persist(next);
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
      {authResolved && !userId && (
        <div
          className="mb-6 rounded-lg p-4 border flex flex-wrap items-center justify-between gap-3"
          style={{
            borderColor: "color-mix(in srgb, var(--navy) 25%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--navy) 6%, transparent)",
          }}
        >
          <p className="text-sm text-ink/80">
            Đăng nhập để lưu lại tiến độ chuẩn bị của bạn.
          </p>
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--navy)" }}
          >
            Đăng nhập
          </Link>
        </div>
      )}

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

      {saveError && (
        <p className="mb-4 text-sm font-medium text-seal">{saveError}</p>
      )}

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
