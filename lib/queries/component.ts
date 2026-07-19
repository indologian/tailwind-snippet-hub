import { prisma } from "@/lib/prisma";

export async function getComponents() {
    return prisma.component.findMany({
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
    });
}

export async function getComponent(slug: string) {
    return prisma.component.findUnique({
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
}