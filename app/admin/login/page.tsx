"use client";

import { Code2, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { loginAction } from "@/app/admin/actions/auth";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await loginAction(formData);

    if (result.success) {
      toast.success("Login berhasil");
      router.push("/admin");
      router.refresh();
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/40 via-background to-primary/10 px-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Code2 size={32} />
          </div>

          <h1 className="text-3xl font-bold text-foreground">
            Tailwind Snippet Hub
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Login sebagai Administrator
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@email.com"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                required
                className="pl-10 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl text-base"
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link
              href="/admin/register"
              className="font-medium text-primary hover:underline"
            >
              Daftar sekarang
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
