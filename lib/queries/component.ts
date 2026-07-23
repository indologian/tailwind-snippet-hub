// lib/queries/component.ts

import { prisma } from "@/lib/prisma";

const DEFAULT_PAGE_SIZE = 8;

export async function getComponents(page = 1, pageSize = DEFAULT_PAGE_SIZE) {
    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * pageSize;

    const [components, totalCount] = await Promise.all([
        prisma.component.findMany({
            include: {
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: pageSize,
        }),
        prisma.component.count(),
    ]);

    return {
        components,
        totalCount,
        currentPage,
        pageSize,
        totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
    };
}

export async function getComponent(id: string) {
    try {
        return await prisma.component.findUnique({
            where: { id },
            include: {
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getComponentBySlug(slug: string) {
    try {
        return await prisma.component.findUnique({
            where: { slug },
            include: {
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
}