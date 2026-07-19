// app\admin\actions\auth.ts

"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import {
    clearAdminSession,
    setAdminSession,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// =====================================
// Register
// =====================================

export async function registerAction(formData: FormData) {
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword =
        formData.get("confirmPassword")?.toString() ?? "";

    if (!name || !email || !password || !confirmPassword) {
        return {
            success: false,
            message: "Semua field wajib diisi.",
        };
    }

    if (password !== confirmPassword) {
        return {
            success: false,
            message: "Konfirmasi password tidak sama.",
        };
    }

    const admin = await prisma.admin.findUnique({
        where: {
            email,
        },
    });

    if (admin) {
        return {
            success: false,
            message: "Email sudah terdaftar.",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.admin.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return {
        success: true,
        message: "Registrasi berhasil.",
    };
}

// =====================================
// Login
// =====================================

export async function loginAction(formData: FormData) {
    const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!email || !password) {
        return {
            success: false,
            message: "Email dan password wajib diisi.",
        };
    }

    const admin = await prisma.admin.findUnique({
        where: {
            email,
        },
    });

    if (!admin) {
        return {
            success: false,
            message: "Email atau password salah.",
        };
    }

    const validPassword = await bcrypt.compare(
        password,
        admin.password
    );

    if (!validPassword) {
        return {
            success: false,
            message: "Email atau password salah.",
        };
    }

    await setAdminSession(admin.id);

    return {
        success: true,
        message: "Login berhasil.",
    };
}

// =====================================
// Logout
// =====================================

export async function logoutAction() {
    console.log("=== LOGOUT ===");

    await clearAdminSession();

    console.log("Cookie dihapus");

    redirect("/admin/login");
}