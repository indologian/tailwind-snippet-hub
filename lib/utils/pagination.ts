// lib/utils/pagination.ts
export type PaginationItem = number | "ellipsis";

/**
 * Menghasilkan array nomor halaman dengan ellipsis.
 * Contoh: [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
 */
export function getPaginationRange(
    current: number,
    total: number,
    siblings = 1,
): PaginationItem[] {
    // total slot terlihat = first + last + current + (siblings * 2) + 2 ellipsis
    const totalVisible = siblings * 2 + 5;

    if (total <= totalVisible) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
        const leftCount = siblings * 2 + 2;
        const left = Array.from({ length: leftCount }, (_, i) => i + 1);
        return [...left, "ellipsis", total];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
        const rightCount = siblings * 2 + 2;
        const right = Array.from(
            { length: rightCount },
            (_, i) => total - rightCount + 1 + i,
        );
        return [1, "ellipsis", ...right];
    }

    // showLeftEllipsis && showRightEllipsis
    const middle = Array.from(
        { length: rightSibling - leftSibling + 1 },
        (_, i) => leftSibling + i,
    );
    return [1, "ellipsis", ...middle, "ellipsis", total];
}

/** Membangun href relatif yang menyimpan search params lain (mis. filter). */
export function buildPageHref(
    page: number,
    searchParams?: Record<string, string | string[] | undefined>,
): string {
    const params = new URLSearchParams();

    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            if (key === "page") continue;
            if (typeof value === "string") params.set(key, value);
        }
    }

    // page 1 = URL canonical tanpa ?page
    if (page > 1) params.set("page", String(page));

    const qs = params.toString();
    return qs ? `?${ qs }` : "?";
}