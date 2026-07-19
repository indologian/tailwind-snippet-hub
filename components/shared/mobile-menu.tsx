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
        className="rounded-xl"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-12
            w-56
            rounded-xl
            border
            bg-background
            p-4
            shadow-xl
          "
        >
          <nav className="flex flex-col gap-2">
            <NavLink href="/" onClick={() => setOpen(false)}>
              Components
            </NavLink>

            <NavLink href="/admin" onClick={() => setOpen(false)}>
              Admin
            </NavLink>

            <form action={logoutAction}>
              <Button
                type="submit"
                variant="ghost"
                className="w-full rounded-xl border border-red-500/20 bg-red-500/5 text-red-500"
              >
                Logout
              </Button>
            </form>
          </nav>
        </div>
      )}
    </div>
  );
}
