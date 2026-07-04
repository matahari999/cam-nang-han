import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t" style={{ borderColor: "color-mix(in srgb, var(--ink) 12%, transparent)" }}>
      <div className="mx-auto max-w-3xl px-5 py-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="seal-mark h-6 w-6 text-[10px]">CNH</span>
          <span className="font-semibold text-navy">Cẩm Nang Hàn</span>
        </div>
        <nav className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium text-navy">
          <Link href="/cam-nang" className="underline underline-offset-2">
            Danh sách chuẩn bị
          </Link>
          <Link href="/khan-cap" className="underline underline-offset-2">
            Số khẩn cấp
          </Link>
          <Link href="/quet-giay-to" className="underline underline-offset-2">
            Giải thích giấy tờ
          </Link>
          <Link href="/phien-dich" className="underline underline-offset-2">
            Phiên dịch Việt–Hàn
          </Link>
          <Link href="/ung-dung" className="underline underline-offset-2">
            Ứng dụng hữu ích
          </Link>
          <Link href="/ban-do" className="underline underline-offset-2">
            Bản đồ
          </Link>
          <Link href="/ket-ban" className="underline underline-offset-2">
            Kết bạn gần bạn
          </Link>
          <Link href="/thanh-vien" className="underline underline-offset-2">
            Gói thành viên
          </Link>
        </nav>
        <nav className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium text-ink/60">
          <Link href="/chinh-sach-bao-mat" className="underline underline-offset-2">
            Chính sách bảo mật
          </Link>
          <Link href="/dieu-khoan" className="underline underline-offset-2">
            Điều khoản sử dụng
          </Link>
        </nav>
        <p className="text-xs leading-relaxed text-ink/60">
          Thông tin trên trang chỉ mang tính tham khảo, giúp bạn chuẩn bị tốt hơn,
          và không phải là tư vấn pháp lý chính thức. Quy định và thủ tục có thể
          thay đổi tùy cơ quan và thời điểm — hãy xác nhận lại với cơ quan chức
          năng trước khi thực hiện.
        </p>
      </div>
    </footer>
  );
}
