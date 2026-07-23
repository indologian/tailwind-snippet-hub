// app/admin/_components/component-table-toolbar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

interface ToolbarProps {
  initialSearch: string;
}

export function ComponentTableToolbar({ initialSearch }: ToolbarProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(initialSearch);

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  const pushParams = (mutator: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(sp.toString());
    mutator(params);
    params.delete("page");
    const qs = params.toString();
    startTransition(() => router.replace(qs ? `/admin?${qs}` : "/admin"));
  };

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      pushParams((p) => {
        if (query.trim()) p.set("q", query.trim());
        else p.delete("q");
      });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul, slug, atau deskripsi..."
          className="h-9 w-full rounded-xl border bg-background pl-9 pr-8 text-sm outline-none transition focus:ring-2 focus:ring-primary/50 dark:border-white/10"
        />
        {isPending && (
          <span className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        )}
      </div>
    </div>
  );
}