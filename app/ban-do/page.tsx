import Link from "next/link";
import type { Metadata } from "next";
import KakaoMap from "@/components/KakaoMap";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";

export const metadata: Metadata = {
  title: "Bản đồ tiện ích — Cẩm Nang Hàn",
  description:
    "Tìm bệnh viện, nhà thuốc, ngân hàng, văn phòng xuất nhập cảnh, trung tâm hỗ trợ gia đình đa văn hóa gần bạn trên bản đồ Kakao.",
};

export default function MapPage() {
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
            <span className="seal-mark h-10 w-10 text-lg">🗺️</span>
            <h1 className="text-2xl font-extrabold text-ink">
              Bản đồ tiện ích quanh bạn
            </h1>
          </div>
          <p className="text-sm text-ink/70 leading-relaxed max-w-xl">
            Chọn loại địa điểm — bản đồ hiển thị các nơi gần bạn nhất kèm số
            điện thoại và nút chỉ đường. Dữ liệu từ KakaoMap, chính xác nhất
            tại Hàn Quốc.
          </p>
        </section>

        <section className="pb-10">
          <KakaoMap />
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
