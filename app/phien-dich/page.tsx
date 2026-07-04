import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";
import DichThuatClient from "@/components/dichthuat/DichThuatClient";

export const metadata: Metadata = {
  title: "Phiên dịch Việt–Hàn — Cẩm Nang Hàn",
  description:
    "Công cụ dịch nhanh Việt–Hàn, dùng khi nói chuyện với bác sĩ, nhân viên hành chính, hoặc gia đình chồng/vợ. Có đọc to bằng giọng nói.",
};

export default function PhienDichPage() {
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
            <span className="seal-mark h-10 w-10 text-lg">🗣️</span>
            <h1 className="text-2xl font-extrabold text-ink">
              Phiên dịch Việt–Hàn
            </h1>
          </div>
          <p className="text-sm text-ink/70 leading-relaxed max-w-xl">
            Gõ một câu, xem bản dịch cỡ chữ lớn để đưa cho người kia đọc, hoặc
            bấm nghe đọc to. Hữu ích khi ở bệnh viện, trung tâm hành chính, hoặc
            nói chuyện với gia đình bên chồng/vợ.
          </p>
        </section>

        <div className="pb-10 max-w-xl">
          <DichThuatClient />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
