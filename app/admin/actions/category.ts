// app\admin\actions\category.ts

"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";


import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// =====================================
// CREATE COMPONENT
// =====================================

export async function createComponentAction(formData: FormData) {
    try {
        console.log("=== MEMULAI PROSES CREATE COMPONENT ===");

        // 1. Ambil & Baca Data Form
        const title = formData.get("title")?.toString().trim() ?? "";
        const slug = formData.get("slug")?.toString().trim().toLowerCase() ?? "";
        const description = formData.get("description")?.toString().trim() ?? "";
        const htmlCode = formData.get("htmlCode")?.toString() ?? "";
        const categoryIdRaw = formData.get("categoryId")?.toString() ?? "";

        console.log("Data diterima:", { title, slug, categoryIdRaw });
        console.log("Panjang HTML Code:", htmlCode.length, "karakter");

        // 2. Validasi awal
        if (!title || !slug || !categoryIdRaw || !htmlCode) {
            console.log("GAGAL: Validasi form dasar gagal (ada field kosong)");
            return { success: false, message: "Semua field wajib diisi." };
        }

        // 3. Cek Duplikasi Slug
        console.log("Mengecek duplikasi slug di database...");
        const existingComponent = await prisma.component.findUnique({
            where: { slug },
        });

        if (existingComponent) {
            console.log(`GAGAL: Slug '${ slug }' sudah ada di database!`);
            return { success: false, message: "Slug sudah digunakan. Coba judul lain." };
        }

        // 4. Proses Upload File
        console.log("Memeriksa unggahan gambar...");
        const file = formData.get("previewImage") as File | null;
        let previewImagePath: string | null = null;

        if (file && file.size > 0 && file.name !== "undefined") {
            try {
                console.log(`File terdeteksi: ${ file.name } (${ file.size } bytes)`);
                const extension = file.name.split(".").pop();
                const filename = `${ slug }-${ Date.now() }.${ extension }`;
                const uploadDir = join(process.cwd(), "public", "uploads");

                console.log(`Menyimpan file ke folder lokal: ${ uploadDir }`);
                mkdirSync(uploadDir, { recursive: true });

                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                writeFileSync(join(uploadDir, filename), buffer);

                previewImagePath = `/uploads/${ filename }`;
                console.log(`File berhasil disimpan di path: ${ previewImagePath }`);
            } catch (fileError) {
                console.error("EROR SAAT MENYIMPAN FILE FISIK:", fileError);
                return { success: false, message: "Sistem gagal menyimpan file gambar ke penyimpanan internal." };
            }
        } else {
            console.log("Tidak ada file gambar valid yang diunggah. Lewati...");
        }

        // 5. Simpan ke Database
        console.log("Memulai proses INSERT ke Prisma Database...");

        // Perhatikan tipe data categoryId yang Anda gunakan di database
        // Jika tipe data relasinya di Prisma adalah String, gunakan categoryIdRaw.
        // Jika Int/Number, uncomment dan gunakan variabel konversi di bawah ini:
        // const parsedCategoryId = parseInt(categoryIdRaw, 10);

        const newComponent = await prisma.component.create({
            data: {
                title,
                slug,
                description: description || null,
                previewImage: previewImagePath,
                htmlCode,
                categoryId: categoryIdRaw, // <- Ubah jadi parsedCategoryId jika di database Anda bertipe Int
            },
        });

        console.log("SUKSES! Komponen berhasil tersimpan dengan ID:", newComponent.id);

        // 6. Refresh UI
        console.log("Merevalidasi path /admin...");
        revalidatePath("/admin");

        console.log("=== PROSES SELESAI DENGAN SUKSES ===");
        return { success: true, message: "Komponen berhasil ditambahkan." };

    } catch (error: any) {
        // 7. MENANGKAP DAN MENCETAK ERROR UTAMA
        console.log("=== TERJADI ERROR FATAL ===");

        // Mencetak eror utuh ke terminal untuk keperluan debugging
        console.error(error);

        // Mencetak pesan error spesifik jika itu berasal dari Prisma
        if (error.code) {
            console.log("Prisma Error Code:", error.code);
            console.log("Prisma Meta Data:", error.meta);
        }

        // Mengembalikan pesan yang akan muncul di UI browser admin Anda
        const userFriendlyError = error.message ? error.message.substring(0, 150) + "..." : "Terjadi kesalahan internal.";

        return {
            success: false,
            message: `Gagal: ${ userFriendlyError }`
        };
    }
}

// =====================================
// UPDATE
// =====================================

export async function updateCategoryAction(
    id: string,
    formData: FormData
) {
    try {
        const name = formData.get("name")?.toString().trim() ?? "";

        if (!name) {
            return {
                success: false,
                message: "Nama kategori wajib diisi.",
            };
        }

        const slug = generateSlug(name);

        const exists = await prisma.category.findFirst({
            where: {
                AND: [
                    {
                        id: {
                            not: id,
                        },
                    },
                    {
                        OR: [
                            { name },
                            { slug },
                        ],
                    },
                ],
            },
        });

        if (exists) {
            return {
                success: false,
                message: "Kategori sudah digunakan.",
            };
        }

        await prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
                slug,
            },
        });

        revalidatePath("/admin/categories");
        revalidatePath("/admin");

        return {
            success: true,
            message: "Kategori berhasil diperbarui.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Terjadi kesalahan saat memperbarui kategori.",
        };
    }
}

// =====================================
// DELETE
// =====================================

export async function deleteCategoryAction(id: string) {
    try {
        await prisma.category.delete({
            where: {
                id,
            },
        });

        revalidatePath("/admin/categories");
        revalidatePath("/admin");

        return {
            success: true,
            message: "Kategori berhasil dihapus.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Kategori gagal dihapus.",
        };
    }
}