"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Trang chủ", emoji: "🏠" },
  { href: "/cam-nang", label: "Cẩm nang", emoji: "📋" },
  { href: "/khan-cap", label: "Khẩn cấp", emoji: "🆘" },
  { href: "/ung-dung", label: "Ứng dụng", emoji: "📱" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Điều hướng chính"
      className="bottom-nav sm:hidden"
    >
      {tabs.map((t) => {
        const active =
          t.href === "/"
            ? pathname === "/"
            : pathname === t.href || pathname.startsWith(t.href + "/");
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className="flex flex-col items-center gap-0.5 py-2 flex-1 text-[10px] font-semibold"
            style={{ color: active ? "var(--seal)" : "var(--navy)" }}
          >
            <span className="text-lg leading-none" aria-hidden>
              {t.emoji}
            </span>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
