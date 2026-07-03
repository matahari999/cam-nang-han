export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t" style={{ borderColor: "color-mix(in srgb, var(--ink) 12%, transparent)" }}>
      <div className="mx-auto max-w-3xl px-5 py-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="seal-mark h-6 w-6 text-[10px]">CNH</span>
          <span className="font-semibold text-navy">Cẩm Nang Hàn</span>
        </div>
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
