"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

type Category = { id: string; name: string };

type Props = {
  categories: Category[];
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    title?: string;
    categoryId?: string;
    description?: string;
    previewImage?: string;
    htmlCode?: string;
    tags?: string;
  };
};

export function ComponentForm({ categories, action, defaultValues }: Props) {
  const [categoryId, setCategoryId] = useState(defaultValues?.categoryId ?? "");
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    defaultValues?.previewImage ?? "",
  );

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (data.url) {
      setPreviewImage(data.url);
      toast.success("Gambar berhasil diupload");
    } else {
      toast.error("Upload gagal");
    }

    setUploading(false);
  }

  return (
    <form
      action={action}
      className="mx-auto max-w-3xl space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <input type="hidden" name="previewImage" value={previewImage} />

      <div className="space-y-2">
        <Label htmlFor="title">Nama</Label>
        <Input
          id="title"
          name="title"
          defaultValue={defaultValues?.title}
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label>Kategori</Label>
        <Select
          value={categoryId}
          onValueChange={(v) => setCategoryId(v ?? "")}
          required
        >
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="categoryId" value={categoryId} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description}
          className="rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preview">Upload Preview Image</Label>
        <Input
          id="preview"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="rounded-xl"
        />
        {uploading && <p className="text-sm text-slate-500">Uploading...</p>}
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mt-2 h-40 rounded-xl border object-cover"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="htmlCode">Kode HTML Tailwind</Label>
        <Textarea
          id="htmlCode"
          name="htmlCode"
          defaultValue={defaultValues?.htmlCode}
          required
          rows={12}
          className="rounded-xl font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (pisahkan dengan koma)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={defaultValues?.tags}
          placeholder="responsive, dark, navbar"
          className="rounded-xl"
        />
      </div>

      <Button
        type="submit"
        className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
      >
        Simpan
      </Button>
    </form>
  );
}
