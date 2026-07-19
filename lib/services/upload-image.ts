// lib/services/upload-image.ts

import { supabaseAdmin } from "@/lib/supabase-admin";

const BUCKET_NAME = "component-previews";

function getPathFromPublicUrl(url: string): string | null {
    const marker = `/storage/v1/object/public/${ BUCKET_NAME }/`;
    const idx = url.indexOf(marker);
    return idx === -1 ? null : url.slice(idx + marker.length);
}

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
        const oldPath = getPathFromPublicUrl(oldImage);

        if (oldPath) {
            const { error } = await supabaseAdmin.storage
                .from(BUCKET_NAME)
                .remove([oldPath]);

            if (error) {
                console.error("Gagal menghapus gambar lama:", error.message);
            }
        }
    }

    // Ambil extension
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "png";

    // Nama file unik
    const filename = `${ slug }-${ Date.now() }.${ extension }`;

    // Upload ke Supabase Storage
    const bytes = await file.arrayBuffer();

    const { error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .upload(filename, Buffer.from(bytes), {
            contentType: file.type,
            upsert: false,
        });

    if (error) {
        throw new Error(`Gagal upload gambar: ${ error.message }`);
    }

    // Ambil public URL
    const { data } = supabaseAdmin.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filename);

    return data.publicUrl;
}