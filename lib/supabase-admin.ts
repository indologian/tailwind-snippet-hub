// lib/supabase-admin.ts
import { createClient } from "@supabase/supabase-js";

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
    throw new Error(
        "SUPABASE_SERVICE_ROLE_KEY tidak ditemukan — cek .env dan restart dev server."
    );
}

export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
);