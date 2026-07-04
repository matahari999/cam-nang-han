import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";

export const metadata: Metadata = {
  title: "Chính sách bảo mật — Cẩm Nang Hàn",
  description:
    "Chính sách bảo mật của ứng dụng Cẩm Nang Hàn: dữ liệu chúng tôi thu thập, cách sử dụng, và quyền của bạn.",
};

export default function PrivacyPolicyPage() {
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
            <span className="seal-mark h-10 w-10 text-lg">🔒</span>
            <h1 className="text-2xl font-extrabold text-ink">
              Chính sách bảo mật
            </h1>
          </div>
          <p className="text-sm text-ink/60">Cập nhật lần cuối: 04/07/2026</p>
        </section>

        <section className="pb-10 space-y-6 text-sm leading-relaxed text-ink/80">
          <p>
            Cẩm Nang Hàn (&ldquo;chúng tôi&rdquo;) tôn trọng quyền riêng tư của
            bạn. Trang này giải thích dữ liệu nào chúng tôi thu thập khi bạn sử
            dụng ứng dụng/trang web Cẩm Nang Hàn, vì sao chúng tôi thu thập, và
            bạn có thể kiểm soát dữ liệu đó như thế nào.
          </p>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              1. Thông tin chúng tôi thu thập
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Thông tin tài khoản:</strong> khi bạn đăng ký/đăng nhập
                bằng email, Kakao hoặc Facebook, chúng tôi nhận email, tên hiển
                thị và ảnh đại diện (nếu có) từ nhà cung cấp đăng nhập đó.
              </li>
              <li>
                <strong>Vị trí (chỉ khi bạn bật):</strong> tính năng &ldquo;Kết
                bạn gần bạn&rdquo; yêu cầu bạn chủ động bật chia sẻ vị trí. Vị
                trí thật của bạn được làm mờ ngẫu nhiên 100–300m trước khi lưu
                trên máy chủ, để người khác không thể biết chính xác nơi bạn
                sống hoặc làm việc. Bạn có thể tắt chia sẻ vị trí bất cứ lúc
                nào trong trang &ldquo;Kết bạn&rdquo;.
              </li>
              <li>
                <strong>Dữ liệu bạn nhập:</strong> tiến trình đánh dấu hoàn
                thành trong danh sách chuẩn bị giấy tờ, và văn bản bạn nhập để
                dịch trong tính năng &ldquo;Phiên dịch Việt–Hàn&rdquo; (được
                gửi đến Google Gemini API để xử lý dịch thuật, không được
                chúng tôi lưu trữ lâu dài).
              </li>
              <li>
                <strong>Dữ liệu kỹ thuật:</strong> loại thiết bị, trình duyệt
                và nhật ký lỗi cơ bản, phục vụ mục đích vận hành và sửa lỗi.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              2. Mục đích sử dụng
            </h2>
            <p>
              Chúng tôi chỉ sử dụng dữ liệu để: (a) cung cấp và vận hành các
              tính năng của ứng dụng, (b) lưu tiến trình của bạn giữa các lần
              đăng nhập, (c) hiển thị người dùng khác gần bạn nếu bạn bật tính
              năng &ldquo;Kết bạn&rdquo;. Chúng tôi <strong>không</strong> bán
              dữ liệu cá nhân của bạn cho bên thứ ba, và không dùng dữ liệu
              cho mục đích quảng cáo nhắm mục tiêu.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              3. Chia sẻ dữ liệu với bên thứ ba
            </h2>
            <p>Dữ liệu được xử lý bởi các nhà cung cấp dịch vụ sau:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-1.5">
              <li>
                <strong>Supabase</strong> (lưu trữ cơ sở dữ liệu và xác thực
                tài khoản)
              </li>
              <li>
                <strong>Kakao, Facebook</strong> (chỉ khi bạn chọn đăng nhập
                bằng các dịch vụ này)
              </li>
              <li>
                <strong>Google Gemini API</strong> (chỉ cho tính năng phiên
                dịch — văn bản bạn nhập được gửi để dịch, không lưu lại)
              </li>
              <li>
                <strong>Vercel</strong> (nền tảng lưu trữ trang web)
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              4. Quyền của bạn
            </h2>
            <p>
              Bạn có thể yêu cầu xem, chỉnh sửa hoặc xoá dữ liệu tài khoản của
              mình bất cứ lúc nào bằng cách liên hệ chúng tôi qua email bên
              dưới. Bạn có thể tắt chia sẻ vị trí hoặc xoá tài khoản mà không
              ảnh hưởng đến khả năng sử dụng các tính năng miễn phí khác của
              ứng dụng.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              5. Trẻ em
            </h2>
            <p>
              Cẩm Nang Hàn không hướng đến trẻ em dưới 13 tuổi và không cố ý
              thu thập dữ liệu từ trẻ em dưới độ tuổi này.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              6. Liên hệ
            </h2>
            <p>
              Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ:{" "}
              <a
                href="mailto:sinab7500@gmail.com"
                className="text-navy underline underline-offset-2"
              >
                sinab7500@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
