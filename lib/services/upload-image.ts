// lib/services/upload-image.ts

import {
    existsSync,
    mkdirSync,
    unlinkSync,
    writeFileSync,
} from "fs";
import { join } from "path";

export async function uploadPreviewImage(
    file: File | null,
    slug: string,
    oldImage?: string | null
): Promise<string> {
    // Tidak ada file yang diupload
    if (!file || file.size === 0) {
        return oldImage ?? "";
    }

    // Hapus gambar lama jika ada
    if (oldImage) {
        const oldImagePath = join(
            process.cwd(),
            "public",
            oldImage
        );

        if (existsSync(oldImagePath)) {
            try {
                unlinkSync(oldImagePath);
            } catch (error) {
                console.error("Gagal menghapus gambar lama:", error);
            }
        }
    }

    // Ambil extension
    const extension =
        file.name.split(".").pop()?.toLowerCase() ?? "png";

    // Nama file unik
    const filename = `${ slug }-${ Date.now() }.${ extension }`;

    // Folder upload
    const uploadDir = join(
        process.cwd(),
        "public",
        "uploads"
    );

    mkdirSync(uploadDir, {
        recursive: true,
    });

    // Simpan file
    const bytes = await file.arrayBuffer();

    writeFileSync(
        join(uploadDir, filename),
        Buffer.from(bytes)
    );

    return `/uploads/${ filename }`;
}