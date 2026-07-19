"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/"
        className={cn(
          `
          rounded-xl
          border
          px-5
          py-2.5
          text-sm
          font-medium
          transition-all
          duration-300
          `,
          pathname === "/"
            ? `
              border-primary
              bg-primary
              text-primary-foreground
              shadow-lg
              shadow-primary/20
            `
            : `
              border-border
              bg-background
              hover:-translate-y-0.5
              hover:border-primary/40
              hover:bg-primary/10
              hover:text-primary
              dark:border-white/10
              dark:bg-slate-900
            `
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
              `
              rounded-xl
              border
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-300
              `,
              active
                ? `
                  border-primary
                  bg-primary
                  text-primary-foreground
                  shadow-lg
                  shadow-primary/20
                `
                : `
                  border-border
                  bg-background
                  hover:-translate-y-0.5
                  hover:border-primary/40
                  hover:bg-primary/10
                  hover:text-primary
                  dark:border-white/10
                  dark:bg-slate-900
                `
            )}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}