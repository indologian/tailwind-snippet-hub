import { Code2 } from "lucide-react";
import Link from "next/link";

import { logoutAction } from "@/app/admin/actions/auth";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "../shared/mobile-menu";
import { NavLink } from "../shared/nav-link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div clp-blure="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-105">
            <Code2 className="h-5 w-5" />
          </div>

          <div className="hidden sm:block">
            <h1 className="font-semibold tracking-tight">Tailwind Snippet</h1>

            <p className="text-xs text-muted-foreground">
              Modern UI Components
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 md:flex lg:gap-6">
          <NavLink href="/">Components</NavLink>
          <NavLink href="/admin">Admin</NavLink>

          <form action={logoutAction}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/5
                px-5
                text-red-500
                transition-all
                hover:-translate-y-0.5
                hover:border-red-500/40
                hover:bg-red-500/10
                hover:text-red-400
                dark:border-red-500/30
                dark:bg-red-500/10
              "
            >
              Logout
            </Button>
          </form>

          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
