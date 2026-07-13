import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "视觉设计师 / AI 设计师 / 品牌设计师作品集",
  description: "聚焦 AI 动态影像、品牌系统与商业视觉的个人设计作品集。",
  keywords: ["视觉设计师", "AI设计师", "品牌设计师", "AIGC", "作品集"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
