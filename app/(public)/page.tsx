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
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="space-y-8 text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />

            <span>Modern Tailwind Component Library</span>
          </div>

          <div className="space-y-5">
            <h1
              className="
              bg-gradient-to-r
              from-slate-900
              via-slate-700
              to-slate-500
              bg-clip-text
              text-4xl
              font-bold
              tracking-tight
              text-transparent
              sm:text-6xl
            "
            >
              Build Faster with
              <br />
              Tailwind Components
            </h1>

            <p
              className="
              mx-auto
              max-w-2xl
              text-base
              leading-relaxed
              text-muted-foreground
              sm:text-lg
            "
            >
              Temukan komponen Tailwind CSS siap pakai. Copy, customize, dan
              gunakan untuk project modern kamu.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">Explore Categories</h2>

            <p className="text-sm text-muted-foreground">
              Pilih kategori component yang ingin kamu gunakan.
            </p>
          </div>

          <CategoryList categories={categories} />
        </section>

        {/* Components */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">Latest Components</h2>

            <p className="text-sm text-muted-foreground">
              Component terbaru yang tersedia.
            </p>
          </div>

          <ComponentGrid components={components} />
        </section>
      </div>
    </div>
  );
}
