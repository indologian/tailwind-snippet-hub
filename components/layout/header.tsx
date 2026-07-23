// components/layout/header.tsx

import { Code2 } from "lucide-react";
import Link from "next/link";

import { logoutAction } from "@/app/admin/actions/auth";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "../shared/mobile-menu";
import { NavLink } from "../shared/nav-link";
import { SearchBar } from "../shared/search-bar";

export function Header() {
  return (
    <header className="sticky top-0 z-60 w-full border-b border-neutral-200/60 bg-white/70 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#0a0a0f]/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-sm font-bold tracking-tight text-neutral-900 sm:text-base dark:text-white">
            Snippet<span className="text-indigo-500">.dev</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex lg:gap-4">
          <SearchBar />

          {/* Nav Items Grouped in a Glass Pill */}
          <div className="flex items-center gap-1 rounded-full border border-neutral-200/80 bg-white/50 p-1 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <NavLink href="/">Components</NavLink>
            <NavLink href="/admin">Admin</NavLink>
          </div>

          <form action={logoutAction}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="rounded-full border border-red-500/20 bg-red-500/5 px-4 text-red-500 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 dark:text-red-400"
            >
              Logout
            </Button>
          </form>

          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <SearchBar mobileIconOnly />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
