// _component/preview-image.tsx
"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export function PreviewImage({ src, alt }: Props) {
  return (
    <button type="button" className="group block w-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-[#0d0d14]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          // Menggunakan object-contain agar gambar tidak terpotong
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    </button>
  );
}
