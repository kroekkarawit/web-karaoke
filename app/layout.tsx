import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "Web-Karaoke.com คาราโอเกะออนไลน์ฟรี",
  description: "คาราโอเกะออนไลน์ฟรี ใช้งานง่ายๆผ่านเว็บ ไม่ต้องโหลดแอพ ไม่ต้องโหลดโปรแกรม ร้องคาราโอเกะ Karaoke เว็บคาราโอเกเกะ Web Karakoke",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
