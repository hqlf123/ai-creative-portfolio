import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://ai-creative-portfolio-2026.huiyu1.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "罗天翔 — AIGC 视觉设计作品集",
  description: "罗天翔个人作品集：AI 视觉设计、AIGC 影像创作、新媒体内容与商业视觉。",
  keywords: ["罗天翔", "AI视觉设计", "AIGC影像", "AI编导", "新媒体", "作品集"],
  openGraph: {
    title: "罗天翔 — AIGC 视觉设计作品集",
    description: "AI 视觉设计 · AIGC 影像创作 · 新媒体内容 · AI 编导创作",
    url: siteUrl,
    siteName: "罗天翔作品集",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 938, alt: "LUO TIANXIANG AIGC VISUAL PORTFOLIO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "罗天翔 — AIGC 视觉设计作品集",
    description: "AI 视觉设计 · AIGC 影像创作 · 新媒体内容",
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
