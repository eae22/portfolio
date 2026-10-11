import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "장은재 | Data & AI Engineer",
  description:
    "데이터를 모으고, AI로 활용하고, 화면까지 직접 만드는 엔지니어 장은재의 포트폴리오입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navigation />
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
