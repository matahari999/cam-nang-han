import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AuthNav from "@/components/AuthNav";
import SiteFooter from "@/components/SiteFooter";
import ThanhVienClient from "@/components/thanhvien/ThanhVienClient";

export const metadata: Metadata = {
  title: "Gói thành viên — Cẩm Nang Hàn",
  description: "Đăng ký gói thành viên Cẩm Nang Hàn để ủng hộ phát triển ứng dụng.",
};

export default async function ThanhVienPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
            <span className="seal-mark h-10 w-10 text-lg">★</span>
            <h1 className="text-2xl font-extrabold text-ink">Gói thành viên</h1>
          </div>
          <p className="text-sm text-ink/70 leading-relaxed max-w-xl">
            Thanh toán qua Google Play, quản lý và huỷ bất cứ lúc nào trong
            Google Play Store trên điện thoại của bạn.
          </p>
        </section>

        <section className="pb-10">
          <ThanhVienClient loggedIn={Boolean(user)} />
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
