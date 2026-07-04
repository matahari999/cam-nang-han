import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";
import QuetGiayToClient from "@/components/quetgiayto/QuetGiayToClient";

export const metadata: Metadata = {
  title: "Giải thích giấy tờ bằng ảnh — Cẩm Nang Hàn",
  description:
    "Chụp ảnh bảng lương, thư cơ quan, hóa đơn tiếng Hàn — AI giải thích từng mục bằng tiếng Việt, không lưu trữ ảnh.",
};

export default function QuetGiayToPage() {
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
            <span className="seal-mark h-10 w-10 text-lg">📷</span>
            <h1 className="text-2xl font-extrabold text-ink">
              Giải thích giấy tờ bằng ảnh
            </h1>
          </div>
          <p className="text-sm text-ink/70 leading-relaxed max-w-xl">
            Không hiểu bảng lương, thư từ cơ quan, hóa đơn tiếng Hàn viết gì? Chụp
            một tấm ảnh, AI sẽ đọc và giải thích từng mục bằng tiếng Việt.
          </p>
        </section>

        <div className="pb-10 max-w-xl">
          <QuetGiayToClient />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
