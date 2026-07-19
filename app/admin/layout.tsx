"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname === "/admin/login" || pathname === "/admin/register";

  return (
    <div className="flex min-h-screen flex-col">
      {!hideLayout && <Header />}

      <main className="flex-1">{children}</main>

      {!hideLayout && <Footer />}
    </div>
  );
}
