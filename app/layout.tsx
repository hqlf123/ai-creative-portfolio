import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hqlf123.github.io/ai-creative-portfolio/"),
  title: "视觉设计师 / AI 设计师 / 品牌设计师作品集",
  description: "聚焦 AI 动态影像、品牌系统与商业视觉的个人设计作品集。",
  keywords: ["视觉设计师", "AI设计师", "品牌设计师", "AIGC", "作品集"],
  openGraph: {
    title: "AI Creative Portfolio",
    description: "视觉设计 · AI 影像 · 品牌设计",
    url: "https://hqlf123.github.io/ai-creative-portfolio/",
    siteName: "AI Creative Portfolio",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "og.png", width: 2184, height: 1005, alt: "AI Creative Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Creative Portfolio",
    description: "视觉设计 · AI 影像 · 品牌设计",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
