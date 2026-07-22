"use client";

import {
  createComponentAction,
  updateComponentAction,
} from "@/app/admin/actions/component";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/utils";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Code2,
  FileImage,
  FolderTree,
  Hash,
  Loader2,
  Save,
  Search,
  Sparkles,
  Type,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react";

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
  const [isDragging, setIsDragging] = useState(false);

  // State untuk Custom Dropdown Category
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [catSearch, setCatSearch] = useState("");
  const catRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(catSearch.toLowerCase()),
  );

  // Handle click outside untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(event.target as Node)) {
        setIsCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || isPending) return;
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("categoryId", categoryId); // Pastikan categoryId terkirim

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
        router.refresh();
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan.");
        setIsSubmitting(false);
      }
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-[#0a0a0f]">
      {/* === Background Layers === */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 50%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent blur-[120px] dark:from-indigo-500/20 dark:via-purple-500/15" />
        <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-cyan-400/10 to-transparent blur-[100px] dark:from-cyan-500/15" />
        <div className="absolute bottom-0 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-fuchsia-400/10 to-transparent blur-[100px] dark:from-fuchsia-500/15" />
      </div>

      <div className="mx-auto max-w-5xl space-y-6 p-4 md:space-y-8 md:p-8">
        {/* === Header === */}
        <section className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-xl md:p-8 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent dark:via-indigo-400/40" />

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 ring-1 ring-inset ring-indigo-500/20 dark:from-indigo-500/15 dark:to-purple-500/15 dark:ring-indigo-400/20">
                <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400">
                    {mode === "create" ? "New" : "Edit"}
                  </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl dark:text-white">
                  {mode === "create" ? "Tambah Component" : "Edit Component"}
                </h1>
                <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                  {mode === "create"
                    ? "Tambahkan snippet Tailwind CSS baru ke koleksi."
                    : "Perbarui informasi component yang sudah ada."}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin")}
              className="h-10 shrink-0 rounded-xl border-neutral-200 bg-white/50 text-neutral-600 backdrop-blur-sm transition-all hover:bg-white hover:text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </div>
        </section>

        {/* === Form Card === */}
        <section className="relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.02]">
          <form onSubmit={handleSubmit} className="space-y-8 p-6 md:p-8">
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-400">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500 animate-pulse" />
                <p>{error}</p>
              </div>
            )}

            {/* === Title + Slug === */}
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Judul Component"
                icon={<Type className="h-3.5 w-3.5" />}
              >
                <input
                  required
                  value={title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setTitle(newTitle);
                    setSlug(generateSlug(newTitle));
                  }}
                  placeholder="Navbar Modern"
                  className={inputClass}
                />
              </FormField>

              <FormField label="Slug" icon={<Hash className="h-3.5 w-3.5" />}>
                <input
                  required
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="slug-komponen"
                  className={`${inputClass} font-mono text-sm`}
                />
              </FormField>
            </div>

            {/* === Category + Preview === */}
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Kategori"
                icon={<FolderTree className="h-3.5 w-3.5" />}
              >
                <div className="relative" ref={catRef}>
                  {/* Hidden input to ensure categoryId is submitted in FormData */}
                  <input type="hidden" name="categoryId" value={categoryId} />

                  {/* Dropdown Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsCatOpen(!isCatOpen)}
                    className={`${inputClass} flex items-center justify-between ${
                      !categoryId && "text-neutral-400 dark:text-neutral-500"
                    }`}
                  >
                    <span className="truncate">
                      {selectedCategory
                        ? selectedCategory.name
                        : "Pilih kategori..."}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
                        isCatOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Panel */}
                  {isCatOpen && (
                    <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg shadow-neutral-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#12121a]">
                      {/* Search Input */}
                      <div className="border-b border-neutral-200/60 p-2 dark:border-white/[0.06]">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                          <input
                            type="text"
                            placeholder="Cari kategori..."
                            value={catSearch}
                            onChange={(e) => setCatSearch(e.target.value)}
                            autoFocus
                            className="h-9 w-full rounded-lg bg-neutral-100/50 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500"
                          />
                        </div>
                      </div>

                      {/* Options List */}
                      <ul className="max-h-48 overflow-y-auto py-1">
                        {filteredCategories.length === 0 ? (
                          <li className="px-4 py-3 text-center text-sm text-neutral-400">
                            Kategori tidak ditemukan.
                          </li>
                        ) : (
                          filteredCategories.map((category) => (
                            <li key={category.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setCategoryId(category.id);
                                  setIsCatOpen(false);
                                  setCatSearch(""); // Reset search
                                }}
                                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 ${
                                  categoryId === category.id
                                    ? "font-medium text-indigo-600 dark:text-indigo-400"
                                    : "text-neutral-700 dark:text-neutral-300"
                                }`}
                              >
                                <span className="truncate">
                                  {category.name}
                                </span>
                                {categoryId === category.id && (
                                  <Check className="h-4 w-4 shrink-0" />
                                )}
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </FormField>

              <FormField
                label="Preview Image"
                icon={<FileImage className="h-3.5 w-3.5" />}
              >
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative overflow-hidden rounded-xl border-2 border-dashed transition-all ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-500/5"
                      : "border-neutral-200 hover:border-neutral-300 dark:border-white/10 dark:hover:border-white/20"
                  }`}
                >
                  <input
                    type="file"
                    name="previewImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  />
                  {imagePreview ? (
                    <div className="relative aspect-[16/7] w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:bg-black/70 dark:text-white">
                        <FileImage className="h-3.5 w-3.5" />
                        Ganti gambar
                      </div>
                    </div>
                  ) : (
                    <div className="flex aspect-[16/7] flex-col items-center justify-center gap-2 p-4 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/5">
                        <FileImage className="h-5 w-5 text-neutral-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                          Klik atau drag gambar
                        </p>
                        <p className="text-xs text-neutral-400">
                          PNG, JPG hingga 2MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </FormField>
            </div>

            {/* === Description === */}
            <FormField
              label="Deskripsi"
              icon={<Type className="h-3.5 w-3.5" />}
            >
              <textarea
                name="description"
                rows={3}
                defaultValue={initialData?.description ?? ""}
                placeholder="Jelaskan secara singkat component ini..."
                className={`${inputClass} min-h-[88px] resize-y py-3`}
              />
            </FormField>

            {/* === Source Code === */}
            <FormField
              label="HTML / Tailwind CSS"
              icon={<Code2 className="h-3.5 w-3.5" />}
            >
              <div className="group/code relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/50 transition-all focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/10 dark:border-white/10 dark:bg-[#0d0d14]">
                <div className="flex items-center gap-2 border-b border-neutral-200/60 px-4 py-2.5 dark:border-white/[0.06]">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-2 font-mono text-[11px] text-neutral-400">
                    {slug || "component"}.tsx
                  </span>
                </div>
                <textarea
                  required
                  name="htmlCode"
                  rows={16}
                  defaultValue={initialData?.htmlCode}
                  placeholder="<div className='...'></div>"
                  spellCheck={false}
                  className="min-h-[400px] w-full resize-y bg-transparent px-4 py-4 font-mono text-[13px] leading-6 text-neutral-800 placeholder:text-neutral-300 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-600"
                />
              </div>
            </FormField>

            {/* === Footer Actions === */}
            <div className="flex flex-col-reverse gap-3 border-t border-neutral-200/60 pt-6 sm:flex-row sm:justify-end dark:border-white/[0.06]">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin")}
                className="h-11 rounded-xl border-neutral-200 px-6 text-neutral-600 transition-all hover:bg-neutral-50 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/5"
              >
                Batal
              </Button>

              <button
                type="submit"
                disabled={isPending || isSubmitting}
                className="group/btn relative inline-flex h-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />

                <span className="relative flex items-center">
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
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

/* === Helper Components & Classes === */

const inputClass = `
  h-11 w-full rounded-xl border border-neutral-200 bg-white px-4
  text-sm text-neutral-900 transition-all
  placeholder:text-neutral-400
  hover:border-neutral-300
  focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/10
  dark:border-white/10 dark:bg-white/[0.03] dark:text-white
  dark:placeholder:text-neutral-500
  dark:hover:border-white/20
`;

function FormField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
        <span className="text-indigo-500 dark:text-indigo-400">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}
