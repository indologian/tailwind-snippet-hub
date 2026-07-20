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