import type { Metadata } from "next";
import { Be_Vietnam_Pro, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cẩm Nang Hàn — Sổ tay cuộc sống tại Hàn Quốc",
  description:
    "Hướng dẫn chuẩn bị giấy tờ và thủ tục thiết yếu tại Hàn Quốc cho người Việt: khám bệnh, gia hạn thẻ cư trú, mở tài khoản ngân hàng, thuê nhà, xin việc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
