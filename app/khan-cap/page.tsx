import Link from "next/link";
import type { Metadata } from "next";
import { emergencyContacts, callTips } from "@/lib/emergency";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";

export const metadata: Metadata = {
  title: "Số điện thoại khẩn cấp — Cẩm Nang Hàn",
  description:
    "Danh sách số điện thoại khẩn cấp và tổng đài hỗ trợ tiếng Việt tại Hàn Quốc: 112, 119, 1345, 1350, 1577-1366, Đại sứ quán Việt Nam.",
};

export default function EmergencyPage() {
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
            <span className="seal-mark h-10 w-10 text-lg">🆘</span>
            <h1 className="text-2xl font-extrabold text-ink">
              Số khẩn cấp & tổng đài hỗ trợ
            </h1>
          </div>
          <p className="text-sm text-ink/70 leading-relaxed max-w-xl">
            Lưu trang này lại — hoạt động cả khi{" "}
            <span className="font-semibold text-navy">không có mạng</span> nếu
            bạn đã cài ứng dụng. Bấm vào số để gọi ngay.
          </p>
        </section>

        <section className="pb-6 flex flex-col gap-3">
          {emergencyContacts.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number.replace(/-/g, "")}`}
              className="paper-card p-4 flex items-center gap-4 transition-transform hover:-translate-y-0.5"
              style={
                c.urgent
                  ? {
                      borderColor:
                        "color-mix(in srgb, var(--seal) 45%, transparent)",
                    }
                  : undefined
              }
            >
              <span
                className={`font-mono font-bold text-lg shrink-0 min-w-[5.5rem] text-center rounded-lg px-2 py-2 ${
                  c.urgent ? "text-paper" : "text-seal"
                }`}
                style={{
                  backgroundColor: c.urgent
                    ? "var(--seal)"
                    : "color-mix(in srgb, var(--seal) 10%, transparent)",
                }}
              >
                {c.number}
              </span>
              <span className="min-w-0">
                <span className="block font-bold text-ink">{c.name}</span>
                <span className="block text-xs text-ink/70 mt-0.5 leading-relaxed">
                  {c.desc}
                </span>
                <span className="mt-1.5 flex flex-wrap gap-1.5">
                  {c.vietnamese && (
                    <span
                      className="text-[10px] font-semibold rounded px-1.5 py-0.5 text-navy"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--navy) 10%, transparent)",
                      }}
                    >
                      Tiếng Việt
                    </span>
                  )}
                  {c.always && (
                    <span
                      className="text-[10px] font-semibold rounded px-1.5 py-0.5 text-gold"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--gold) 14%, transparent)",
                      }}
                    >
                      24 giờ
                    </span>
                  )}
                </span>
              </span>
            </a>
          ))}
        </section>

        <section className="pb-10">
          <h2 className="text-lg font-bold text-ink mb-3">
            Mẹo khi gọi khẩn cấp
          </h2>
          <div className="flex flex-col gap-3">
            {callTips.map((t) => (
              <div key={t.title} className="paper-card p-4">
                <h3 className="font-semibold text-navy text-sm mb-1">
                  {t.title}
                </h3>
                <p className="text-sm text-ink/75 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink/50 leading-relaxed">
            Số điện thoại có thể thay đổi theo thời gian — nếu một số không gọi
            được, hãy kiểm tra lại trên trang web chính thức của cơ quan đó.
          </p>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
