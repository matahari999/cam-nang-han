import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import PwaRegister from "@/components/PwaRegister";

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
  metadataBase: new URL("https://cam-nang-han.vercel.app"),
  title: {
    default: "Cẩm Nang Hàn — Sổ tay cuộc sống tại Hàn Quốc",
    template: "%s",
  },
  description:
    "Hướng dẫn chuẩn bị giấy tờ và thủ tục thiết yếu tại Hàn Quốc cho người Việt: khám bệnh, gia hạn thẻ cư trú, mở tài khoản ngân hàng, thuê nhà, xin việc, số khẩn cấp.",
  applicationName: "Cẩm Nang Hàn",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cẩm Nang Hàn",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Cẩm Nang Hàn",
    title: "Cẩm Nang Hàn — Sổ tay cuộc sống tại Hàn Quốc",
    description:
      "Chuẩn bị đúng giấy tờ, tự tin làm mọi thủ tục ở Hàn — 100% tiếng Việt.",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F1E4",
  width: "device-width",
  initialScale: 1,
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
        <BottomNav />
        <PwaRegister />
      </body>
    </html>
  );
}
