"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// =====================================
// GET ALL
// =====================================

export async function getTagsAction() {
    return prisma.tag.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

// =====================================
// GET BY ID
// =====================================

export async function getTagByIdAction(id: string) {
    return prisma.tag.findUnique({
        where: {
            id,
        },
    });
}

// =====================================
// CREATE
// =====================================

export async function createTagAction(formData: FormData) {
    const name = formData.get("name")?.toString().trim() ?? "";

    if (!name) {
        return {
            success: false,
            message: "Nama tag wajib diisi.",
        };
    }

    const exists = await prisma.tag.findUnique({
        where: {
            name,
        },
    });

    if (exists) {
        return {
            success: false,
            message: "Tag sudah ada.",
        };
    }

    await prisma.tag.create({
        data: {
            name,
        },
    });

    revalidatePath("/admin/tags");

    return {
        success: true,
        message: "Tag berhasil dibuat.",
    };
}

// =====================================
// UPDATE
// =====================================

export async function updateTagAction(
    id: string,
    formData: FormData
) {
    const name = formData.get("name")?.toString().trim() ?? "";

    if (!name) {
        return {
            success: false,
            message: "Nama tag wajib diisi.",
        };
    }

    const exists = await prisma.tag.findFirst({
        where: {
            name,
            NOT: {
                id,
            },
        },
    });

    if (exists) {
        return {
            success: false,
            message: "Tag sudah ada.",
        };
    }

    await prisma.tag.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });

    revalidatePath("/admin/tags");

    return {
        success: true,
        message: "Tag berhasil diubah.",
    };
}

// =====================================
// DELETE
// =====================================

export async function deleteTagAction(id: string) {
    await prisma.tag.delete({
        where: {
            id,
        },
    });

    revalidatePath("/admin/tags");
}