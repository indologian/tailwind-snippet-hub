// components/category/category-list.tsx
"use client";

import { LayoutGrid, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;

    return categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [categories, query]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  const baseClass =
    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-[#0a0a0f]";

  const activeClass =
    "border-transparent bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400";

  const inactiveClass =
    "border-neutral-200 bg-white/60 text-neutral-600 backdrop-blur-sm hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-white hover:text-neutral-900 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white";

  return (
    <div className="space-y-4">
      {/* === Search === */}
      <div className="group relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400" />

        <input
          type="text"
          aria-label="Cari kategori"
          placeholder="Cari kategori..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-10 text-sm text-neutral-900 outline-none transition-all placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Hapus pencarian"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-white/10 dark:hover:text-neutral-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* === Category List === */}
      <nav
        aria-label="Categories"
        className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
      >
        {/* Edge fade indicators (mobile only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent dark:from-[#0a0a0f] md:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-[#0a0a0f] md:hidden"
        />

        <ul className="flex list-none gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible md:pb-0">
          <li className="shrink-0 snap-start">
            <Link
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={cn(
                baseClass,
                isActive("/") ? activeClass : inactiveClass,
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Semua</span>
            </Link>
          </li>

          {filteredCategories.map((category) => {
            const href = `/category/${category.slug}`;
            const active = isActive(href);

            return (
              <li key={category.id} className="shrink-0 snap-start">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    baseClass,
                    active ? activeClass : inactiveClass,
                  )}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* === Empty State === */}
      {filteredCategories.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-neutral-300 py-10 text-center dark:border-white/10">
          <Search className="h-5 w-5 text-neutral-400" />
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Tidak ada kategori yang ditemukan.
          </p>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400"
            >
              Reset pencarian
            </button>
          )}
        </div>
      )}
    </div>
  );
}
