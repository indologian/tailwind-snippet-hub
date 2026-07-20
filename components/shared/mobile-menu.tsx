"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { logoutAction } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-neutral-200 bg-white/50 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <>
          {/* Backdrop blur untuk menutup layar saat menu terbuka */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown Panel */}
          <div
            className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#12121a]/90"
            style={{ animation: "fadeInDown 0.2s ease-out" }}
          >
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
                  className="w-full rounded-full border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 dark:text-red-400"
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
