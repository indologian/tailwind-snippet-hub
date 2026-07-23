// app/admin/_components/sortable-th.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import type { ComponentSortField, SortOrder } from "@/lib/queries/component";

interface SortableThProps {
  label: string;
  field: ComponentSortField;
  currentSort: ComponentSortField;
  currentOrder: SortOrder;
}

export function SortableTh({
  label,
  field,
  currentSort,
  currentOrder,
}: SortableThProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const isActive = currentSort === field;

  const handleSort = () => {
    const params = new URLSearchParams(sp.toString());

    if (isActive) {
      // Jika kolom ini sedang aktif, toggle arahnya (asc <-> desc)
      params.set("order", currentOrder === "asc" ? "desc" : "asc");
    } else {
      // Jika pindah ke kolom baru, set sort baru dan default ke asc
      params.set("sort", field);
      params.set("order", "asc");
    }

    // Reset ke page 1 saat sort berubah
    params.delete("page");

    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `/admin?${qs}` : "/admin");
    });
  };

  return (
    <th className="px-6 py-4 text-left text-sm font-medium">
      <button
        onClick={handleSort}
        disabled={isPending}
        className={`inline-flex items-center gap-1.5 transition-colors hover:text-foreground ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
        {isActive ? (
          currentOrder === "asc" ? (
            <ArrowUp className="h-3.5 w-3.5" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5" />
          )
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
        )}
      </button>
    </th>
  );
}