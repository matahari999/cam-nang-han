import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import KetBanClient from "@/components/ketban/KetBanClient";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";

export const metadata: Metadata = {
  title: "Kết bạn gần bạn — Cẩm Nang Hàn",
  description:
    "Kết nối với người Việt sống gần bạn tại Hàn Quốc — bớt cô đơn khi xa nhà, rủ nhau cà phê hay uống một ly.",
};

export default async function KetBanPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <div className="mx-auto max-w-2xl px-5">
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
            <span className="seal-mark h-10 w-10 text-lg">🤝</span>
            <h1 className="text-2xl font-extrabold text-ink">
              Kết bạn gần bạn
            </h1>
          </div>
          <p className="text-sm text-ink/70 leading-relaxed max-w-xl">
            Sống xa nhà đôi khi buồn — kết nối với người Việt gần bạn để có
            người rủ cà phê, ăn uống, hoặc chỉ đơn giản là nói chuyện bằng
            tiếng Việt.
          </p>
        </section>

        <section className="pb-10">
          {user ? (
            <KetBanClient userId={user.id} />
          ) : (
            <div
              className="rounded-lg p-4 border flex flex-wrap items-center justify-between gap-3"
              style={{
                borderColor: "color-mix(in srgb, var(--navy) 25%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--navy) 6%, transparent)",
              }}
            >
              <p className="text-sm text-ink/80">
                Đăng nhập để tìm và kết nối với người Việt gần bạn.
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
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
