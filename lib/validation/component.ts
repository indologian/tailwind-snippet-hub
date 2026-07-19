// lib/validation/component.ts

import { z } from "zod";

export const componentSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Judul wajib diisi"),

    slug: z
        .string()
        .trim()
        .min(1, "Slug wajib diisi"),

    description: z.string().optional(),

    htmlCode: z
        .string()
        .min(1, "Source code wajib diisi"),

    categoryId: z
        .string()
        .min(1, "Kategori wajib dipilih"),
});

export type ComponentInput =
    z.infer<typeof componentSchema>;