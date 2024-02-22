import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "../../room.css";


export const metadata: Metadata = {
  title: "Web-Karaoke.com คาราโอเกะออนไลน์ฟรี",
  description: "คาราโอเกะออนไลน์ฟรี ใช้งานง่ายๆผ่านเว็บ ไม่ต้องโหลดแอพ ไม่ต้องโหลดโปรแกรม ร้องคาราโอเกะ Karaoke เว็บคาราโอเกเกะ Web Karakoke",
};


export default function RoomLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>

      {children}
    </section>
  );
}
