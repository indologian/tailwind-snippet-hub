// lib/queries/categories.ts

"use server";

import { prisma } from "@/lib/prisma";

export async function getCategories() {
    return prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

export async function getCategory(id: string) {
    return prisma.category.findUnique({
        where: {
            id,
        },
    });
}

export async function getCategoryBySlug(slug: string) {
    return prisma.category.findUnique({
        where: {
            slug,
        },
    });
}