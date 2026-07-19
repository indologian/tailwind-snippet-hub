"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
        active && "bg-primary text-primary-foreground",
      )}
    >
      {children}
    </Link>
  );
}
