import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Tailwind Snippet Hub",
  description: "Simpan dan bagikan snippet Tailwind CSS dengan mudah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
