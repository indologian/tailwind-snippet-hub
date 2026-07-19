import { BUCKET, supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const ext = file.name.split(".").pop();
    const fileName = `${ Date.now() }.${ ext }`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, buffer, { contentType: file.type, upsert: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

    return NextResponse.json({ url: data.publicUrl });
}