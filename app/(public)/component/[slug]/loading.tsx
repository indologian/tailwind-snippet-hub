// app/(public)/component/[slug]/loading.tsx
import { ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-[#0a0a0f]">
      {/* === Background Layers (sama persis dengan page.tsx) === */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, #000 50%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 to-transparent blur-[120px] dark:from-indigo-500/20" />
        <div className="absolute top-1/4 -right-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-cyan-400/10 to-transparent blur-[100px] dark:from-cyan-500/15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back Button — statis, tidak perlu skeleton */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/50 py-1.5 pl-3 pr-4 text-sm font-medium text-neutral-600 backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:bg-white hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Kembali
        </Link>

        {/* Header Skeleton */}
        <section className="mt-8 max-w-3xl animate-pulse">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1">
              <Tag className="h-3 w-3 opacity-0" />
              <span className="h-3 w-16 rounded bg-indigo-500/20" />
            </span>
          </div>

          {/* Title */}
          <div className="h-9 w-3/4 rounded-lg bg-neutral-200 md:h-10 dark:bg-white/10" />

          {/* Description (2 baris) */}
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full rounded bg-neutral-150 dark:bg-white/[0.06]" />
            <div className="h-4 w-2/3 rounded bg-neutral-150 dark:bg-white/[0.06]" />
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            <div className="h-6 w-16 rounded-lg bg-neutral-100 dark:bg-white/5" />
            <div className="h-6 w-20 rounded-lg bg-neutral-100 dark:bg-white/5" />
            <div className="h-6 w-14 rounded-lg bg-neutral-100 dark:bg-white/5" />
          </div>
        </section>

        {/* Gradient Divider — statis */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-white/10" />

        {/* Content Grid: Split View */}
        <section className="grid gap-8 lg:grid-cols-5">
          {/* === Preview Section === */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                  Preview
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  Tampilan visual component
                </p>
              </div>
            </div>

            <div className="lg:sticky lg:top-8">
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.02]">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

                {/* Preview image skeleton */}
                <div className="aspect-[16/10] w-full animate-pulse bg-neutral-100 dark:bg-white/[0.04]" />
              </div>
            </div>
          </div>

          {/* === Source Code Section === */}
          <aside className="min-w-0 space-y-4 lg:col-span-3">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                  Source Code
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  Salin dan gunakan pada proyekmu
                </p>
              </div>
            </div>

            {/* Code Editor Frame */}
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm dark:border-white/[0.08] dark:bg-[#0d0d14] dark:shadow-lg dark:shadow-black/20">
              {/* Toolbar — dots statis, nama file & badge di-skeleton */}
              <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 backdrop-blur-md dark:border-white/[0.06] dark:bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/70 dark:bg-red-500/50" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70 dark:bg-yellow-500/50" />
                  <span className="h-3 w-3 rounded-full bg-green-400/70 dark:bg-green-500/50" />

                  <div className="ml-3 h-3 w-24 animate-pulse rounded bg-neutral-200 dark:bg-white/10" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden h-5 w-10 animate-pulse rounded-md bg-neutral-100 sm:block dark:bg-white/5" />
                  <div className="h-7 w-16 animate-pulse rounded-md bg-neutral-100 dark:bg-white/5" />
                </div>
              </div>

              {/* Code content skeleton */}
              <div className="animate-pulse space-y-3 p-5">
                <div className="h-3.5 w-5/6 rounded bg-neutral-200 dark:bg-white/[0.06]" />
                <div className="h-3.5 w-2/3 rounded bg-neutral-200 dark:bg-white/[0.06]" />
                <div className="h-3.5 w-3/4 rounded bg-neutral-200 dark:bg-white/[0.06]" />
                <div className="h-3.5 w-1/2 rounded bg-neutral-200 dark:bg-white/[0.06]" />
                <div className="h-3.5 w-4/5 rounded bg-neutral-200 dark:bg-white/[0.06]" />
                <div className="h-3.5 w-2/5 rounded bg-neutral-200 dark:bg-white/[0.06]" />
                <div className="h-3.5 w-3/4 rounded bg-neutral-200 dark:bg-white/[0.06]" />
                <div className="h-3.5 w-5/6 rounded bg-neutral-200 dark:bg-white/[0.06]" />
                <div className="h-3.5 w-1/3 rounded bg-neutral-200 dark:bg-white/[0.06]" />
                <div className="h-3.5 w-2/3 rounded bg-neutral-200 dark:bg-white/[0.06]" />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
