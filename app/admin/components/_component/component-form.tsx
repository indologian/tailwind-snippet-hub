"use client";

import {
  createComponentAction,
  updateComponentAction,
} from "@/app/admin/actions/component";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/utils";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ComponentData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  htmlCode: string;
  categoryId: string;
  previewImage?: string | null;
}

interface ComponentFormProps {
  mode: "create" | "edit";
  initialData?: ComponentData;
  categories: Category[];

  onSubmit?: (formData: FormData) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export default function ComponentForm({
  mode,
  initialData,
  categories,
  onSubmit,
}: ComponentFormProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");

  const [slug, setSlug] = useState(initialData?.slug ?? "");

  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? "");

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.previewImage ?? null,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Submit Form
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting || isPending) return;

    setError(null);

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    formData.set("title", title);

    formData.set("slug", slug);

    startTransition(async () => {
      try {
        let result;

        if (mode === "create") {
          result = await createComponentAction(formData);
        } else {
          if (onSubmit) {
            result = await onSubmit(formData);
          } else {
            if (!initialData?.id) {
              throw new Error("ID component tidak ditemukan.");
            }
            result = await updateComponentAction(initialData.id, formData);
          }
        }

        if (!result.success) {
          setError(result.message);
          setIsSubmitting(false);
          return;
        }

        router.push("/admin");
      } catch (err) {
        console.error(err);

        setError("Terjadi kesalahan.");

        setIsSubmitting(false);
      }
    });
  }
  return (
    <main className="min-h-screen bg-muted/20 dark:bg-slate-950">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-[-220px]
            h-[520px]
            w-[520px]
            -translate-x-1/2
            rounded-full
            bg-primary/10
            blur-3xl
            dark:bg-primary/20
          "
        />
      </div>

      <div className="mx-auto max-w-5xl space-y-8 p-4 md:p-8">
        {/* Header */}
        <section
          className="
            rounded-3xl
            border
            border-border/60
            bg-background/80
            p-6
            shadow-lg
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-slate-900/70
          "
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                  ring-1
                  ring-primary/20
                "
              >
                <Save className="h-7 w-7 text-primary" />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {mode === "create" ? "Tambah Component" : "Edit Component"}
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  {mode === "create"
                    ? "Tambahkan snippet Tailwind CSS baru."
                    : "Perbarui informasi component."}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin")}
              className="rounded-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </div>
        </section>

        {/* Form Card */}
        <section
          className="
            rounded-3xl
            border
            border-border/60
            bg-background
            p-8
            shadow-sm
            dark:border-white/10
            dark:bg-slate-900
          "
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div
                className="
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  p-4
                  text-sm
                  text-red-500
                "
              >
                {error}
              </div>
            )}
            {/* Judul + Slug */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Judul Component</label>

                <input
                  required
                  value={title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setTitle(newTitle);
                    setSlug(generateSlug(newTitle));
                  }}
                  placeholder="Navbar Modern"
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-background
                    px-4
                    transition
                    placeholder:text-muted-foreground
                    focus:border-primary
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    dark:border-white/10
                    dark:bg-slate-950
                  "
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>

                <input
                  required
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="slug-komponen"
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-background
                    px-4
                    transition
                    placeholder:text-muted-foreground
                    focus:border-primary
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    dark:border-white/10
                    dark:bg-slate-950
                  "
                />
              </div>
            </div>
            {/* Category + Preview */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategori</label>

                <select
                  name="categoryId"
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-background
                    px-4
                    transition
                    focus:border-primary
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    dark:border-white/10
                    dark:bg-slate-950
                  "
                >
                  <option value="">Pilih kategori</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preview Image</label>

                <input
                  type="file"
                  name="previewImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="
                    block
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-background
                    px-3
                    py-2
                    text-sm
                    file:mr-4
                    file:rounded-lg
                    file:border-0
                    file:bg-primary/10
                    file:px-4
                    file:py-2
                    file:font-medium
                    file:text-primary
                    hover:file:bg-primary/20
                    dark:border-white/10
                    dark:bg-slate-950
                  "
                />

                {imagePreview && (
                  <div className="mt-3 relative w-full max-w-xs h-40 overflow-hidden rounded-xl border border-border bg-slate-50 dark:bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>{" "}
            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Deskripsi</label>

              <textarea
                name="description"
                rows={4}
                defaultValue={initialData?.description ?? ""}
                placeholder="Jelaskan secara singkat component ini..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  transition
                  placeholder:text-muted-foreground
                  focus:border-primary
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/20
                  dark:border-white/10
                  dark:bg-slate-950
                "
              />
            </div>
            {/* Source Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium">HTML / Tailwind CSS</label>

              <textarea
                required
                name="htmlCode"
                rows={18}
                defaultValue={initialData?.htmlCode}
                placeholder="<div className='...'></div>"
                spellCheck={false}
                className="
                  min-h-[450px]
                  w-full
                  resize-y
                  rounded-2xl
                  border
                  border-border
                  bg-muted/30
                  px-4
                  py-4
                  font-mono
                  text-[13px]
                  leading-6
                  transition
                  placeholder:text-muted-foreground
                  focus:border-primary
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/20
                  dark:border-white/10
                  dark:bg-slate-950
                "
              />
            </div>
            {/* Footer */}
            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                pt-6
                sm:flex-row
                sm:justify-end
              "
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin")}
                className="
                  h-11
                  rounded-xl
                  px-6
                "
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Batal
              </Button>

              <Button
                type="submit"
                disabled={isPending || isSubmitting}
                className="
                  h-11
                  rounded-xl
                  px-7
                  bg-primary
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  hover:shadow-primary/20
                  disabled:translate-y-0
                  disabled:shadow-none
                "
              >
                {isPending || isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === "create" ? "Menyimpan..." : "Memperbarui..."}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {mode === "create"
                      ? "Simpan Component"
                      : "Update Component"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
