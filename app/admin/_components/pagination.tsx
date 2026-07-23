// app/admin/_components/pagination.tsx

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string | string[] | undefined>;
}

function buildHref(
  page: number,
  searchParams?: Record<string, string | string[] | undefined>,
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
  return query ? `/admin?${query}` : "/admin";
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

export function AdminPagination({
  currentPage,
  totalPages,
  searchParams,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const btn =
    "flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium text-muted-foreground transition-colors hover:bg-muted dark:border-white/10";
  const btnDisabled =
    "flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium text-muted-foreground/40 cursor-not-allowed dark:border-white/5";
  const btnActive =
    "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground";

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center justify-between gap-3 border-t px-6 py-4 dark:border-white/5 sm:flex-row"
    >
      <p className="text-sm text-muted-foreground">
        Halaman {currentPage} dari {totalPages}
      </p>

      <div className="flex items-center gap-1.5">
        {hasPrev ? (
          <Link
            href={buildHref(currentPage - 1, searchParams)}
            aria-label="Previous page"
            className={btn}
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span aria-disabled="true" className={btnDisabled}>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}

        {/* Mobile: indikator ringkas */}
        <span className="flex h-9 items-center rounded-xl border px-3 text-sm font-medium sm:hidden dark:border-white/10">
          {currentPage} / {totalPages}
        </span>

        {/* Desktop: nomor halaman */}
        <div className="hidden items-center gap-1.5 sm:flex">
          {pages.map((p, idx) =>
            p === "dots" ? (
              <span
                key={`dots-${idx}`}
                className="flex h-9 w-9 items-center justify-center text-muted-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <Link
                key={p}
                href={buildHref(p, searchParams)}
                aria-current={p === currentPage ? "page" : undefined}
                className={p === currentPage ? btnActive : btn}
              >
                {p}
              </Link>
            ),
          )}
        </div>

        {hasNext ? (
          <Link
            href={buildHref(currentPage + 1, searchParams)}
            aria-label="Next page"
            className={btn}
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span aria-disabled="true" className={btnDisabled}>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  );
}
