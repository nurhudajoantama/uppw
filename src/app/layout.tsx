import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/navbar";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ujian Praktikum Pemrograman Web",
  description: "CRUD untuk menyelesaikan ujian praktikum pemrograman web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
