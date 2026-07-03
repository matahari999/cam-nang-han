import Link from "next/link";
import { checklists } from "@/lib/checklists";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";

export default function HomePage() {
  return (
    <main>
      <div className="mx-auto max-w-3xl px-5">
        <header className="pt-12 pb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="seal-mark h-11 w-11 text-xs">CNH</span>
            <div>
              <p className="font-bold text-navy leading-tight">Cẩm Nang Hàn</p>
              <p className="text-xs text-ink/60 font-mono">Sổ tay cuộc sống tại Hàn Quốc</p>
            </div>
          </div>
          <AuthNav />
        </header>

        <section className="py-10">
          <div className="flex justify-center mb-6">
            <span className="seal-mark h-24 w-24 text-sm tracking-wider">
              THỦ TỤC
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink text-center leading-tight">
            Chuẩn bị đúng giấy tờ,
            <br />
            <span className="text-seal">tự tin làm mọi thủ tục ở Hàn</span>
          </h1>
          <p className="mt-5 text-center text-base text-ink/70 leading-relaxed max-w-xl mx-auto">
            Dành cho người Việt đang sống và làm việc tại Hàn Quốc. Chọn tình
            huống của bạn — chúng tôi liệt kê từng loại giấy tờ cần mang theo và
            giải thích <span className="font-semibold text-navy">tại sao cần</span>,
            tất cả bằng tiếng Việt.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/cam-nang"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-paper transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--seal)" }}
            >
              Xem danh sách chuẩn bị →
            </Link>
          </div>
        </section>

        <section className="py-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Theo từng tình huống",
              d: "Khám bệnh, gia hạn thẻ cư trú, mở tài khoản... mỗi việc một danh sách riêng.",
            },
            {
              t: "Giải thích tại sao",
              d: "Không chỉ liệt kê giấy tờ, mà cho biết lý do cần để bạn không bị thiếu sót.",
            },
            {
              t: "100% tiếng Việt",
              d: "Kèm chú thích tên giấy tờ bằng tiếng Hàn để bạn dễ đối chiếu tại cơ quan.",
            },
          ].map((f) => (
            <div key={f.t} className="paper-card p-5">
              <div className="seal-mark h-8 w-8 text-xs mb-3">✓</div>
              <h3 className="font-bold text-navy mb-1">{f.t}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </section>

        <section className="py-10">
          <h2 className="text-xl font-bold text-ink mb-1">Các tình huống phổ biến</h2>
          <p className="text-sm text-ink/60 mb-5">
            Chọn việc bạn sắp làm để xem danh sách chuẩn bị.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {checklists.map((s) => (
              <Link
                key={s.slug}
                href={`/cam-nang/${s.slug}`}
                className="paper-card p-4 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
              >
                <span className="text-2xl" aria-hidden>
                  {s.emoji}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{s.title}</span>
                  <span className="block text-xs text-ink/60 mt-0.5 leading-relaxed">
                    {s.short}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
