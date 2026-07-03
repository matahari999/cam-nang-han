import Link from "next/link";
import type { Metadata } from "next";
import { checklists } from "@/lib/checklists";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";

export const metadata: Metadata = {
  title: "Danh sách chuẩn bị theo tình huống — Cẩm Nang Hàn",
  description:
    "Chọn tình huống của bạn để xem đầy đủ giấy tờ cần chuẩn bị khi làm thủ tục tại Hàn Quốc.",
};

export default function ChecklistIndexPage() {
  return (
    <main>
      <div className="mx-auto max-w-3xl px-5">
        <header className="pt-10 pb-4 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm font-medium text-navy underline underline-offset-2"
          >
            ← Trang chủ
          </Link>
          <AuthNav />
        </header>

        <section className="py-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="seal-mark h-10 w-10 text-[11px]">CNH</span>
            <h1 className="text-2xl font-extrabold text-ink">
              Danh sách chuẩn bị
            </h1>
          </div>
          <p className="text-sm text-ink/70 leading-relaxed max-w-xl">
            Mỗi tình huống có một danh sách giấy tờ riêng, kèm lý do vì sao cần.
            Chọn việc bạn sắp làm bên dưới.
          </p>
        </section>

        <section className="pb-10 grid gap-3 sm:grid-cols-2">
          {checklists.map((s) => (
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
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
