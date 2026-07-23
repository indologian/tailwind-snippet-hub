// components/shared/pagination.tsx

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  searchParams?: Record<string, string | string[] | undefined>;
}

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string | string[] | undefined>
) {
  const params = new URLSearchParams();

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (key === "page") continue;
      if (typeof value === "string") params.set(key, value);
    }
  }

  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

function getPageRange(current: number, total: number): (number | "dots")[] {
  const delta = 1;
  const range: (number | "dots")[] = [];

  for (let i = 1; i <= total; i++) {
    const withinDelta = i >= current - delta && i <= current + delta;
    if (i === 1 || i === total || withinDelta) {
      range.push(i);
    } else if (range[range.length - 1] !== "dots") {
      range.push("dots");
    }
  }

  return range;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/",
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const navBtn =
    "flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200/80 bg-white text-neutral-500 transition-all duration-200 hover:border-indigo-500/30 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-neutral-400 dark:hover:border-indigo-400/30 dark:hover:bg-white/[0.05] dark:hover:text-indigo-400";

  const navBtnDisabled =
    "flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200/50 bg-neutral-50 text-neutral-300 cursor-not-allowed dark:border-white/[0.04] dark:bg-white/[0.01] dark:text-neutral-700";

  const pageBtn =
    "flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200/80 bg-white text-sm font-medium text-neutral-600 transition-all duration-200 hover:border-indigo-500/30 hover:text-indigo-600 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-neutral-300 dark:hover:border-indigo-400/30 dark:hover:text-indigo-400";

  const pageBtnActive =
    "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 text-sm font-semibold text-white shadow-md shadow-indigo-500/25";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 pt-2 sm:gap-2"
    >
      {hasPrev ? (
        <Link
          href={buildHref(basePath, currentPage - 1, searchParams)}
          aria-label="Previous page"
          className={navBtn}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span aria-disabled="true" className={navBtnDisabled}>
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {/* Mobile: compact "current / total" indicator */}
      <span className="flex h-9 items-center rounded-xl border border-neutral-200/80 bg-white px-4 text-sm font-medium text-neutral-600 sm:hidden dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-neutral-300">
        {currentPage} / {totalPages}
      </span>

      {/* Desktop: numbered pages with ellipsis */}
      <div className="hidden items-center gap-1.5 sm:flex">
        {pages.map((p, idx) =>
          p === "dots" ? (
            <span
              key={`dots-${idx}`}
              className="flex h-9 w-9 items-center justify-center text-neutral-400 dark:text-neutral-600"
            >
              <MoreHorizontal className="h-4 w-4" />
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(basePath, p, searchParams)}
              aria-current={p === currentPage ? "page" : undefined}
              className={p === currentPage ? pageBtnActive : pageBtn}
            >
              {p}
            </Link>
          )
        )}
      </div>

      {hasNext ? (
        <Link
          href={buildHref(basePath, currentPage + 1, searchParams)}
          aria-label="Next page"
          className={navBtn}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span aria-disabled="true" className={navBtnDisabled}>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}