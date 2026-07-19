"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SearchResult = {
  id: string;
  title: string;
  slug: string;
  category: { name: string; slug: string };
  tags: { tag: { name: string } }[];
};

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
      setOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari komponen, kategori, atau tag..."
          className="rounded-xl border-slate-200 bg-slate-50 pl-10 focus-visible:ring-indigo-500"
          onFocus={() => query && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {results.map((item) => (
            <button
              key={item.id}
              type="button"
              className="flex w-full flex-col items-start px-4 py-3 text-left transition hover:bg-slate-50"
              onMouseDown={() => router.push(`/component/${item.slug}`)}
            >
              <span className="font-medium text-slate-900">{item.title}</span>
              <span className="text-xs text-slate-500">
                {item.category.name}
                {item.tags.length > 0 &&
                  ` · ${item.tags.map((t) => t.tag.name).join(", ")}`}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
