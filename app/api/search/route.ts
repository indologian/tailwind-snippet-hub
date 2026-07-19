import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

    if (!q) return NextResponse.json([]);

    const components = await prisma.component.findMany({
        where: {
            OR: [
                { title: { contains: q, mode: "insensitive" } },
                { category: { name: { contains: q, mode: "insensitive" } } },
                { tags: { some: { tag: { name: { contains: q, mode: "insensitive" } } } } },
            ],
        },
        include: {
            category: true,
            tags: { include: { tag: true } },
        },
        take: 8,
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(components);
}