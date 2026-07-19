// app/actions/search.ts
"use server";

import { prisma } from "@/lib/prisma";

export type SearchResult = {
    id: string;
    title: string;
    slug: string;
    previewImage: string | null;
    category: { name: string } | null;
};

export async function searchComponentsAction(
    query: string
): Promise<SearchResult[]> {
    const q = query.trim();

    if (q.length < 2) {
        return [];
    }

    const components = await prisma.component.findMany({
        where: {
            OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                {
                    tags: {
                        some: {
                            tag: { name: { contains: q, mode: "insensitive" } },
                        },
                    },
                },
                {
                    category: {
                        name: { contains: q, mode: "insensitive" },
                    },
                },
            ],

        },
        include: {
            category: true,
        },
        take: 6,
        orderBy: { title: "asc" },
    });

    return components.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        previewImage: c.previewImage,
        category: c.category ? { name: c.category.name } : null,
    }));
}