import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Creative Portfolio — 创意技术作品集",
  description: "专注多模态创作、生成式设计与 AI 产品表达的个人作品集。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
