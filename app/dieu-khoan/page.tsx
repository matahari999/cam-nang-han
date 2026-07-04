import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import AuthNav from "@/components/AuthNav";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng — Cẩm Nang Hàn",
  description: "Điều khoản sử dụng ứng dụng Cẩm Nang Hàn.",
};

export default function TermsPage() {
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
            <span className="seal-mark h-10 w-10 text-lg">📜</span>
            <h1 className="text-2xl font-extrabold text-ink">
              Điều khoản sử dụng
            </h1>
          </div>
          <p className="text-sm text-ink/60">Cập nhật lần cuối: 04/07/2026</p>
        </section>

        <section className="pb-10 space-y-6 text-sm leading-relaxed text-ink/80">
          <p>
            Khi sử dụng Cẩm Nang Hàn, bạn đồng ý với các điều khoản dưới đây.
          </p>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              1. Mục đích tham khảo
            </h2>
            <p>
              Nội dung trong ứng dụng (danh sách chuẩn bị giấy tờ, hướng dẫn
              thủ tục, số khẩn cấp...) chỉ mang tính tham khảo, giúp bạn chuẩn
              bị tốt hơn. Đây <strong>không phải</strong> là tư vấn pháp lý
              chính thức. Quy định và thủ tục hành chính có thể thay đổi — hãy
              luôn xác nhận lại với cơ quan chức năng có thẩm quyền trước khi
              thực hiện.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              2. Tính năng &ldquo;Kết bạn gần bạn&rdquo;
            </h2>
            <p>
              Đây là tính năng kết nối cộng đồng, không phải ứng dụng hẹn hò.
              Khi gặp người quen qua ứng dụng, hãy gặp ở nơi công cộng, báo cho
              người thân biết, và tuyệt đối không chuyển tiền cho người bạn
              chưa gặp trực tiếp. Chúng tôi không chịu trách nhiệm về các
              tương tác giữa người dùng ngoài phạm vi ứng dụng.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              3. Tài khoản
            </h2>
            <p>
              Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình. Chúng
              tôi có quyền tạm khoá tài khoản vi phạm điều khoản hoặc có hành
              vi gây hại cho người dùng khác.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">
              4. Miễn trừ trách nhiệm
            </h2>
            <p>
              Ứng dụng được cung cấp &ldquo;nguyên trạng&rdquo;, không đảm bảo
              không có lỗi. Chúng tôi không chịu trách nhiệm cho các thiệt hại
              phát sinh từ việc sử dụng hoặc không thể sử dụng ứng dụng.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink mb-2">5. Liên hệ</h2>
            <p>
              Câu hỏi về điều khoản, vui lòng liên hệ:{" "}
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
