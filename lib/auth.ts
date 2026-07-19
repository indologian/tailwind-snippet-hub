// lib\auth.ts

import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

export async function setAdminSession(adminId: string) {
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE, adminId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
}

export async function clearAdminSession() {
    const cookieStore = await cookies();

    cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminSession() {
    const cookieStore = await cookies();

    return cookieStore.get(SESSION_COOKIE)?.value;
}