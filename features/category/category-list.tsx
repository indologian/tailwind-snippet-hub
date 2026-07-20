// features/category/category-list.tsx

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryListProps {
  categories: Category[];
  activeSlug?: string;
}

export function CategoryList({ categories }: CategoryListProps) {
  const pathname = usePathname();

  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible no-scrollbar">
      <Link
        href="/"
        className={cn(
          "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
          pathname === "/"
            ? "border-transparent bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 dark:bg-indigo-500"
            : "border-neutral-200 bg-white/60 text-neutral-600 backdrop-blur-sm hover:border-neutral-300 hover:bg-white hover:text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white",
        )}
      >
        Semua
      </Link>

      {categories.map((category) => {
        const active = pathname === `/category/${category.slug}`;

        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              active
                ? "border-transparent bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 dark:bg-indigo-500"
                : "border-neutral-200 bg-white/60 text-neutral-600 backdrop-blur-sm hover:border-neutral-300 hover:bg-white hover:text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white",
            )}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
