import { LayoutGrid, SquarePen } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <section
      className="
    rounded-3xl
    border
    border-border/60
    bg-background/80
    p-6
    shadow-lg
    backdrop-blur-xl
    dark:border-white/10
    dark:bg-slate-900/70
    dark:shadow-primary/5
  "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div className="flex items-center gap-4">
          <div
            className="
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-primary/10
          ring-1
          ring-primary/20
          transition-all
          duration-300
          before:absolute
          before:inset-0
          before:-z-10
          before:rounded-2xl
          before:bg-primary/20
          before:blur-xl
          dark:bg-primary/15
          dark:ring-primary/30
        "
          >
            <LayoutGrid className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard Admin
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Kelola seluruh component Tailwind CSS dengan mudah.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Add Component */}
          <Button
            className="
    h-11
    rounded-xl
    border
    border-primary/20
    bg-primary/10
    px-5
    text-primary
    shadow-none
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:border-primary/40
    hover:bg-primary/15
    hover:shadow-md
    hover:shadow-primary/10
    dark:border-primary/30
    dark:bg-primary/15
  "
          >
            <Link href="/admin/components/new">
            <div className="flex items-center">
              <SquarePen className="mr-2 h-4 w-4" />
              Tambah Component
            </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
