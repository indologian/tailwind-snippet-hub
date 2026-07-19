import { prisma } from "@/lib/prisma";

export async function getTags() {
    return prisma.tag.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

export async function getTag(id: string) {
    return prisma.tag.findUnique({
        where: {
            id,
        },
    });
}