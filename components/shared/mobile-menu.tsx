// components/shared/mobile-menu.tsx

"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { logoutAction } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-60">
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen((prev) => !prev)}
        className={`relative z-60 rounded-full transition-all duration-200 ${
          open
            ? "border-indigo-500/40 bg-[#18181f] text-white shadow-lg shadow-indigo-500/20"
            : "border-neutral-200 bg-white/50 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
        }`}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-black/10 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 animate-in fade-in zoom-in-95 dark:border-white/10 dark:bg-[#12121a]/95">
            <nav className="flex flex-col gap-1">
              <NavLink href="/" onClick={() => setOpen(false)}>
                Components
              </NavLink>

              <NavLink href="/admin" onClick={() => setOpen(false)}>
                Admin
              </NavLink>

              <div className="my-2 h-px bg-neutral-200 dark:bg-white/10" />

              <form action={logoutAction}>
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full rounded-full border border-red-500/20 bg-red-500/5 text-red-500 transition-colors hover:bg-red-500/10 dark:text-red-400"
                >
                  Logout
                </Button>
              </form>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
