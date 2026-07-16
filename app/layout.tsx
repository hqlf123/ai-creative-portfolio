import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://ai-creative-portfolio-2026.huiyu1.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "罗天翔 — AIGC 视觉设计作品集",
  description: "罗天翔 AIGC 设计师作品集：AI 视觉设计、生成式影像、商业视觉与新媒体内容。",
  keywords: ["罗天翔", "AIGC设计师", "AI视觉设计", "生成式影像", "商业视觉", "作品集"],
  openGraph: {
    title: "罗天翔 — AIGC 视觉设计作品集",
    description: "AIGC 设计师 · AI 视觉设计 · 生成式影像 · 商业视觉",
    url: siteUrl,
    siteName: "罗天翔作品集",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 938, alt: "LUO TIANXIANG AIGC VISUAL PORTFOLIO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "罗天翔 — AIGC 视觉设计作品集",
    description: "AIGC 设计师 · AI 视觉设计 · 生成式影像 · 商业视觉",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#02133d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
