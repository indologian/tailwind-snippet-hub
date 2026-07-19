"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { logoutAction } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/button";

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
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                hover:bg-muted
              "
            >
              Components
            </Link>

            <Link href="/admin">
              <Button
                className="w-full rounded-xl"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Admin
              </Button>
            </Link>

            <form action={logoutAction}>
              <Button
                type="submit"
                className="
                  w-full
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/5
                  text-red-500
                "
                variant="ghost"
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
