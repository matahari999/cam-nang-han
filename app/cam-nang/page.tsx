import Link from "next/link";
import type { Metadata } from "next";
import ChecklistBrowser from "@/components/ChecklistBrowser";
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
            Tìm kiếm hoặc chọn nhóm bên dưới.
          </p>
        </section>

        <section className="pb-10">
          <ChecklistBrowser />
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
