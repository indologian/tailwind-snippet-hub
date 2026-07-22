"use server";

import { prisma } from "@/lib/prisma";
import { uploadPreviewImage } from "@/lib/services/upload-image";
import { componentSchema } from "@/lib/validation/component";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// =====================================
// CREATE COMPONENT
// =====================================

export async function createComponentAction(formData: FormData) {
    const parsed = componentSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        htmlCode: formData.get("htmlCode"),
        categoryId: formData.get("categoryId"),
    });

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    // Cek slug
    const exists = await prisma.component.findUnique({
        where: {
            slug: parsed.data.slug,
        },
    });

    if (exists) {
        return {
            success: false,
            message: "Slug sudah digunakan.",
        };
    }

    const file = formData.get("previewImage") as File;

    const previewImage = await uploadPreviewImage(
        file,
        parsed.data.slug
    );

    await prisma.component.create({
        data: {
            ...parsed.data,
            description: parsed.data.description || null,
            previewImage,
        },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    redirect("/admin");

    return {
        success: true,
        message: "Component berhasil ditambahkan.",
    };
}


// =====================================
// UPDATE COMPONENT
// =====================================

export async function updateComponentAction(
    id: string,
    formData: FormData
) {
    const parsed = componentSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        htmlCode: formData.get("htmlCode"),
        categoryId: formData.get("categoryId"),
    });

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    const component = await prisma.component.findUnique({
        where: {
            id,
        },
    });

    if (!component) {
        return {
            success: false,
            message: "Component tidak ditemukan.",
        };
    }

    // cek slug dipakai component lain
    const slugExists = await prisma.component.findFirst({
        where: {
            slug: parsed.data.slug,
            NOT: {
                id,
            },
        },
    });

    if (slugExists) {
        return {
            success: false,
            message: "Slug sudah digunakan.",
        };
    }

    let previewImage = component.previewImage;

    const file = formData.get("previewImage") as File;

    if (file && file.size > 0) {
        previewImage = await uploadPreviewImage(
            file,
            parsed.data.slug,
            component.previewImage
        );
    }

    await prisma.component.update({
        where: {
            id,
        },
        data: {
            ...parsed.data,
            description: parsed.data.description || null,
            previewImage,
        },
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return {
        success: true,
        message: "Component berhasil diperbarui.",
    };
}

// =====================================
// DELETE COMPONENT
// =====================================

export async function deleteComponentAction(id: string) {
    try {
        await prisma.component.delete({
            where: {
                id,
            },
        });

        revalidatePath("/");
        revalidatePath("/admin");

        return {
            success: true,
            message: "Komponen berhasil dihapus.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menghapus komponen.",
        };
    }
}

// =====================================
// GET COMPONENT
// =====================================

export async function getComponentAction(id: string) {
    return prisma.component.findUnique({
        where: {
            id,
        },
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

