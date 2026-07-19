"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { registerAction } from "@/app/admin/actions/auth";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminRegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Konfirmasi password tidak sama.");
      setLoading(false);
      return;
    }

    const result = await registerAction(formData);

    if (result.success) {
      toast.success("Registrasi berhasil.");

      router.push("/admin/login");
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-6 rounded-xl border bg-background p-8 shadow-sm"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-foreground">Register Admin</h1>

          <p className="text-sm text-muted-foreground">
            Buat akun administrator baru
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>

          <Input
            id="name"
            name="name"
            placeholder="Nama lengkap"
            required
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@email.com"
            required
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <Input
            id="password"
            name="password"
            type="password"
            required
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="rounded-xl"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full rounded-xl">
          {loading ? "Loading..." : "Daftar"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link
            href="/admin/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
