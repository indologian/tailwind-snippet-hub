// app/(public)/page.tsx

import { CategoryList } from "@/features/category/category-list";
import { ComponentGrid } from "@/features/component/component-grid";
import { prisma } from "@/lib/prisma";
import { Sparkles } from "lucide-react";

export default async function HomePage() {
  const [categories, components] = await Promise.all([
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.component.findMany({
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-[#0a0a0f]">
      {/* === Background Layers === */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 50%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 to-transparent blur-[120px] dark:from-indigo-500/20" />
        <div className="absolute top-1/4 -right-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-cyan-400/10 to-transparent blur-[100px] dark:from-cyan-500/15" />
        <div className="absolute bottom-0 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-fuchsia-400/10 to-transparent blur-[100px] dark:from-fuchsia-500/15" />
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* === Hero === */}
        <section className="space-y-8 text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-neutral-200/80 bg-white/50 px-4 py-1.5 text-xs font-medium text-neutral-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Modern Tailwind Component Library</span>
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl dark:text-white">
              Build Faster with
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-300">
                Tailwind Components
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400">
              Temukan komponen Tailwind CSS siap pakai. Copy, customize, dan
              gunakan untuk project modern kamu.
            </p>
          </div>
        </section>

        {/* === Categories === */}
        <section className="space-y-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Explore Categories
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Pilih kategori component yang ingin kamu gunakan.
            </p>
          </div>

          <CategoryList categories={categories} />
        </section>

        {/* === Components === */}
        <section className="space-y-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Latest Components
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Component terbaru yang tersedia.
            </p>
          </div>

          <ComponentGrid components={components} />
        </section>
      </div>
    </main>
  );
}