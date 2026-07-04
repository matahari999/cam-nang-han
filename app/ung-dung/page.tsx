import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";

export const metadata: Metadata = {
  title: "Ứng dụng & trang web hữu ích — Cẩm Nang Hàn",
  description:
    "Những ứng dụng và trang web người Việt tại Hàn Quốc nên có: dịch thuật, bản đồ, visa, thuế, chuyển tiền, giao thông.",
};

type AppItem = {
  name: string;
  emoji: string;
  desc: string;
  url?: string;
};

type AppGroup = {
  title: string;
  items: AppItem[];
};

const groups: AppGroup[] = [
  {
    title: "Dịch thuật & giao tiếp",
    items: [
      {
        name: "Papago",
        emoji: "🦜",
        desc: "App dịch Hàn–Việt tốt nhất hiện nay, dịch được cả ảnh chụp (menu, biển hiệu, giấy tờ) và hội thoại giọng nói.",
      },
      {
        name: "Google Dịch",
        emoji: "🌐",
        desc: "Dự phòng khi Papago dịch chưa rõ. Chế độ camera dịch trực tiếp tiện khi đọc thư từ, hướng dẫn sử dụng.",
      },
      {
        name: "KakaoTalk",
        emoji: "💬",
        desc: "Ứng dụng nhắn tin quốc dân của Hàn. Công ty, trường học, bác sĩ, môi giới nhà... hầu như đều liên lạc qua KakaoTalk.",
      },
    ],
  },
  {
    title: "Thủ tục hành chính & visa",
    items: [
      {
        name: "Hi Korea",
        emoji: "🪪",
        desc: "Trang chính thức về xuất nhập cảnh: đặt lịch hẹn, gia hạn visa, khai báo đổi địa chỉ, tra cứu thủ tục.",
        url: "https://www.hikorea.go.kr",
      },
      {
        name: "정부24 (Gov24)",
        emoji: "🏛️",
        desc: "Cổng dịch vụ công: xin cấp giấy tờ, xác nhận cư trú, nhiều thủ tục làm online không cần ra 주민센터.",
        url: "https://www.gov.kr",
      },
      {
        name: "Hometax (홈택스)",
        emoji: "🧾",
        desc: "Trang thuế quốc gia: quyết toán cuối năm (연말정산), hoàn thuế, cấp giấy xác nhận thu nhập.",
        url: "https://www.hometax.go.kr",
      },
      {
        name: "EPS (고용허가제)",
        emoji: "👷",
        desc: "Trang chính thức cho lao động E-9: hợp đồng, đổi nơi làm việc, bảo hiểm mãn hạn xuất cảnh. Có tiếng Việt.",
        url: "https://www.eps.go.kr",
      },
    ],
  },
  {
    title: "Bản đồ & đi lại",
    items: [
      {
        name: "Naver Map / KakaoMap",
        emoji: "🗺️",
        desc: "Ở Hàn, Google Maps chỉ đường rất kém — dùng Naver Map hoặc KakaoMap để tìm đường, giờ xe buýt, tàu điện chính xác.",
      },
      {
        name: "Kakao T",
        emoji: "🚕",
        desc: "Gọi taxi không cần nói tiếng Hàn: nhập điểm đến trong app, tài xế tự biết. Trả tiền mặt, thẻ, hoặc thẻ trong app.",
      },
      {
        name: "지하철 (Kakao Metro)",
        emoji: "🚇",
        desc: "Bản đồ tàu điện ngầm, tính giờ chuyến nhanh nhất, báo ga đến — dễ dùng kể cả chưa rành tiếng Hàn.",
      },
    ],
  },
  {
    title: "Tiền bạc",
    items: [
      {
        name: "App ngân hàng của bạn",
        emoji: "🏦",
        desc: "KB스타뱅킹, 신한 SOL, 우리WON, 하나원큐, 토스... Đăng ký ngay khi mở tài khoản để chuyển khoản, xem lương, không phải ra quầy.",
      },
      {
        name: "App chuyển tiền về Việt Nam",
        emoji: "💸",
        desc: "GME, E9pay, Hanpass, Sentbe... — được cấp phép, giao diện tiếng Việt, tỷ giá tốt hơn quầy ngân hàng. So sánh vài app trước khi gửi.",
      },
      {
        name: "Toss (토스)",
        emoji: "💳",
        desc: "Quản lý mọi tài khoản/thẻ một chỗ, chuyển khoản dễ, xem điểm tín dụng miễn phí.",
      },
    ],
  },
  {
    title: "Đời sống & khẩn cấp",
    items: [
      {
        name: "배달의민족 / Coupang Eats",
        emoji: "🍜",
        desc: "Đặt đồ ăn giao tận nhà. Chọn món bằng hình ảnh nên không cần giỏi tiếng Hàn.",
      },
      {
        name: "Coupang",
        emoji: "📦",
        desc: "Mua sắm online lớn nhất Hàn, giao nhanh trong ngày/sáng hôm sau (로켓배송).",
      },
      {
        name: "Emergency Ready App (안전디딤돌)",
        emoji: "🚨",
        desc: "App cảnh báo thiên tai chính thức cho người nước ngoài: hướng dẫn khi động đất, bão, nơi trú ẩn gần nhất.",
      },
      {
        name: "Danuri (다누리)",
        emoji: "👨‍👩‍👧",
        desc: "Cổng thông tin cho gia đình đa văn hóa bằng tiếng Việt: luật, phúc lợi, nuôi dạy con, lớp học miễn phí.",
        url: "https://www.liveinkorea.kr",
      },
    ],
  },
];

export default function AppsPage() {
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
            <span className="seal-mark h-10 w-10 text-lg">📱</span>
            <h1 className="text-2xl font-extrabold text-ink">
              Ứng dụng & trang web nên có
            </h1>
          </div>
          <p className="text-sm text-ink/70 leading-relaxed max-w-xl">
            Bộ công cụ giúp cuộc sống tại Hàn dễ hơn hẳn — tất cả đều miễn phí
            tải về. Tìm theo tên trong App Store / Google Play.
          </p>
        </section>

        <div className="pb-10 flex flex-col gap-8">
          {groups.map((g) => (
            <section key={g.title}>
              <h2 className="text-lg font-bold text-ink mb-3">{g.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {g.items.map((a) => (
                  <div key={a.name} className="paper-card p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl" aria-hidden>
                        {a.emoji}
                      </span>
                      <h3 className="font-bold text-navy">{a.name}</h3>
                    </div>
                    <p className="text-sm text-ink/70 leading-relaxed">
                      {a.desc}
                    </p>
                    {a.url && (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block font-mono text-xs text-seal underline underline-offset-2"
                      >
                        {a.url.replace("https://www.", "")} ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
