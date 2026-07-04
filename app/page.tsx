import Link from "next/link";
import { checklists, categories } from "@/lib/checklists";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";
import InstallPrompt from "@/components/InstallPrompt";

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

        <InstallPrompt />

        <section className="py-8">
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
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/cam-nang"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-paper transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--seal)" }}
            >
              Xem danh sách chuẩn bị →
            </Link>
            <Link
              href="/khan-cap"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold text-navy transition-colors hover:bg-navy/5"
              style={{
                borderColor: "color-mix(in srgb, var(--navy) 30%, transparent)",
              }}
            >
              🆘 Số khẩn cấp
            </Link>
          </div>
        </section>

        <section className="py-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Theo từng tình huống",
              d: "Khám bệnh, gia hạn thẻ cư trú, nợ lương, về nước... mỗi việc một danh sách riêng.",
            },
            {
              t: "Giải thích tại sao",
              d: "Không chỉ liệt kê giấy tờ, mà cho biết lý do cần để bạn không bị thiếu sót.",
            },
            {
              t: "Dùng được khi mất mạng",
              d: "Cài vào màn hình chính như app — danh sách và số khẩn cấp xem được cả khi offline.",
            },
          ].map((f) => (
            <div key={f.t} className="paper-card p-5">
              <div className="seal-mark h-8 w-8 text-xs mb-3">✓</div>
              <h3 className="font-bold text-navy mb-1">{f.t}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </section>

        <section className="py-8">
          <h2 className="text-xl font-bold text-ink mb-1">
            {checklists.length} tình huống thường gặp
          </h2>
          <p className="text-sm text-ink/60 mb-6">
            Chọn việc bạn sắp làm để xem danh sách chuẩn bị.
          </p>
          <div className="flex flex-col gap-7">
            {categories.map((cat) => {
              const items = checklists.filter((s) => s.category === cat.id);
              if (items.length === 0) return null;
              return (
                <div key={cat.id}>
                  <h3 className="text-sm font-bold text-navy mb-2.5">
                    {cat.emoji} {cat.name}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {items.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/cam-nang/${s.slug}`}
                        className="paper-card p-4 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
                      >
                        <span className="text-2xl" aria-hidden>
                          {s.emoji}
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">
                            {s.title}
                          </span>
                          <span className="block text-xs text-ink/60 mt-0.5 leading-relaxed">
                            {s.short}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/ban-do"
            className="paper-card p-5 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
          >
            <span className="text-3xl" aria-hidden>
              🗺️
            </span>
            <span>
              <span className="block font-bold text-ink">
                Bản đồ tiện ích quanh bạn
              </span>
              <span className="block text-xs text-ink/60 mt-0.5 leading-relaxed">
                Bệnh viện, nhà thuốc, ngân hàng, văn phòng xuất nhập cảnh... gần
                bạn nhất, kèm số điện thoại và chỉ đường.
              </span>
            </span>
          </Link>
          <Link
            href="/khan-cap"
            className="paper-card p-5 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
            style={{
              borderColor: "color-mix(in srgb, var(--seal) 40%, transparent)",
            }}
          >
            <span className="text-3xl" aria-hidden>
              🆘
            </span>
            <span>
              <span className="block font-bold text-ink">
                Số khẩn cấp & tổng đài tiếng Việt
              </span>
              <span className="block text-xs text-ink/60 mt-0.5 leading-relaxed">
                112, 119, 1345, 1350, Danuri 1577-1366, Đại sứ quán... bấm là
                gọi ngay, xem được cả khi offline.
              </span>
            </span>
          </Link>
          <Link
            href="/ket-ban"
            className="paper-card p-5 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
          >
            <span className="text-3xl" aria-hidden>
              🤝
            </span>
            <span>
              <span className="block font-bold text-ink">
                Kết bạn gần bạn
              </span>
              <span className="block text-xs text-ink/60 mt-0.5 leading-relaxed">
                Kết nối với người Việt gần bạn — bớt cô đơn khi xa nhà, rủ nhau
                cà phê hay một ly.
              </span>
            </span>
          </Link>
          <Link
            href="/ung-dung"
            className="paper-card p-5 flex items-start gap-3 transition-transform hover:-translate-y-0.5"
          >
            <span className="text-3xl" aria-hidden>
              📱
            </span>
            <span>
              <span className="block font-bold text-ink">
                Ứng dụng & trang web nên có
              </span>
              <span className="block text-xs text-ink/60 mt-0.5 leading-relaxed">
                Papago, Hi Korea, Naver Map, app chuyển tiền... bộ công cụ sống
                ở Hàn dễ hơn.
              </span>
            </span>
          </Link>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
