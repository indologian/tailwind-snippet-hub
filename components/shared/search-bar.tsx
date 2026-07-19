"use client";

import { Loader2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { searchComponentsAction, type SearchResult } from "@/app/(public)/actions/search";
import { Button } from "@/components/ui/button";

export function SearchBar({ mobileIconOnly = false }: { mobileIconOnly?: boolean }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPending, startTransition] = useTransition();
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // Shortcut buka: Cmd+K / Ctrl+K, tutup: Escape
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

    // Debounce pencarian
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
            <Button
                type="button"
                variant="outline"
                size={mobileIconOnly ? "icon" : "sm"}
                onClick={() => setOpen(true)}
                className={mobileIconOnly ? "rounded-xl" : "gap-2 rounded-xl text-muted-foreground"}
            >
                <Search className="h-4 w-4" />
                {!mobileIconOnly && (
                    <>
                        <span className="hidden lg:inline">Cari komponen...</span>
                        <kbd className="ml-1 hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium lg:inline-flex">
                            ⌘K
                        </kbd>
                    </>
                )}
            </Button>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 pt-24 backdrop-blur-sm">
                    <div
                        ref={panelRef}
                        className="w-full max-w-lg overflow-hidden rounded-2xl border bg-background shadow-2xl"
                    >
                        <div className="flex items-center gap-2 border-b px-4 py-3">
                            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyNav}
                                placeholder="Cari nama komponen, deskripsi, atau tag..."
                                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            />
                            {isPending && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />}
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="shrink-0 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="max-h-80 overflow-y-auto p-2">
                            {query.trim().length < 2 && (
                                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                                    Ketik minimal 2 karakter untuk mencari.
                                </p>
                            )}

                            {query.trim().length >= 2 && !isPending && results.length === 0 && (
                                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                                    Tidak ada komponen ditemukan untuk &quot;{query}&quot;.
                                </p>
                            )}

                            {results.map((result, index) => (
                                <button
                                    key={result.id}
                                    type="button"
                                    onClick={() => goToResult(result)}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                                        index === activeIndex ? "bg-primary/10" : "hover:bg-muted/60"
                                    }`}
                                >
                                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border bg-muted">
                                        {result.previewImage && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={result.previewImage}
                                                alt={result.title}
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">{result.title}</p>
                                        {result.category && (
                                            <p className="truncate text-xs text-muted-foreground">
                                                {result.category.name}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}