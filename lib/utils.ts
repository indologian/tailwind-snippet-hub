import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Menggabungkan class Tailwind tanpa konflik.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Mengubah text menjadi slug.
 */
export function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

/**
 * Alias dari slugify.
 */
export function generateSlug(text: string) {
  return slugify(text);
}

/**
 * Memotong text.
 */
export function truncate(text: string, length = 120) {
  if (text.length <= length) return text;

  return text.slice(0, length) + "...";
}

/**
 * Format tanggal Indonesia.
 */
export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}