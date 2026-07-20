"use client";

import { CornerDownLeft, Loader2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import {
  searchComponentsAction,
  type SearchResult,
} from "@/app/(public)/actions/search";
import { Button } from "@/components/ui/button";

export function SearchBar({
  mobileIconOnly = false,
}: {
  mobileIconOnly?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      startTransition(async () => {
        const data = await searchComponentsAction(query);
        setResults(data);
        setActiveIndex(0);
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  function goToResult(result: SearchResult) {
    setOpen(false);
    router.push(`/component/${result.slug}`);
  }

  function handleKeyNav(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      goToResult(results[activeIndex]);
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <Button
        type="button"
        variant="outline"
        size={mobileIconOnly ? "icon" : "sm"}
        onClick={() => setOpen(true)}
        className={
          mobileIconOnly
            ? "rounded-full border-neutral-200 bg-white/50 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
            : "flex items-center gap-2 rounded-full border-neutral-200 bg-white/50 px-3 py-2 text-sm text-neutral-500 backdrop-blur-sm transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:bg-white/10"
        }
      >
        <Search className="h-4 w-4" />
        {!mobileIconOnly && (
          <>
            <span className="hidden lg:inline">Cari komponen...</span>
            <kbd className="ml-4 hidden items-center gap-1 rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 lg:flex dark:border-white/10 dark:bg-white/5 dark:text-neutral-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </>
        )}
      </Button>

      {/* Command Palette Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm">
          <div
            ref={panelRef}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#12121a]"
            style={{ animation: "fadeInDown 0.2s ease-out" }}
          >
            {/* Search Input Header */}
            <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3.5 dark:border-white/[0.06]">
              <Search className="h-4 w-4 shrink-0 text-neutral-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyNav}
                placeholder="Cari nama komponen, deskripsi, atau tag..."
                className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-500"
              />
              {isPending && (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-indigo-500" />
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[400px] overflow-y-auto p-2 custom-scroll-light dark:custom-scroll-dark">
              {query.trim().length < 2 && (
                <p className="px-3 py-8 text-center text-sm text-neutral-400">
                  Ketik minimal 2 karakter untuk mencari.
                </p>
              )}

              {query.trim().length >= 2 &&
                !isPending &&
                results.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-neutral-400">
                    Tidak ada komponen ditemukan untuk &quot;{query}&quot;.
                  </p>
                )}

              {results.map((result, index) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => goToResult(result)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    index === activeIndex
                      ? "bg-indigo-500/10 dark:bg-indigo-500/10"
                      : "hover:bg-neutral-100 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-white/5">
                    {result.previewImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={result.previewImage}
                        alt={result.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Search className="h-4 w-4 text-neutral-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-medium ${index === activeIndex ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-900 dark:text-white"}`}
                    >
                      {result.title}
                    </p>
                    {result.category && (
                      <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                        {result.category.name}
                      </p>
                    )}
                  </div>
                  {index === activeIndex && (
                    <CornerDownLeft className="h-4 w-4 shrink-0 text-indigo-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-2.5 text-xs text-neutral-500 dark:border-white/[0.06] dark:text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1 py-0.5 dark:border-white/10 dark:bg-white/5">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1 py-0.5 dark:border-white/10 dark:bg-white/5">
                    ↓
                  </kbd>
                  Navigasi
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1 py-0.5 dark:border-white/10 dark:bg-white/5">
                    ↵
                  </kbd>
                  Pilih
                </span>
              </div>
              <span>Powered by Snippet.dev</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
