// page.tsx (ComponentDetailPage)
import { ArrowLeft, Hash, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyCodeButton } from "@/components/shared/copy-code-button";
import { highlightCode } from "@/lib/highlight-code";
import { getComponentBySlug } from "@/lib/queries/component";
import { PreviewImage } from "./_component/preview-image";

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const component = await getComponentBySlug(slug);

  if (!component) {
    notFound();
  }

  const highlightedHtml = await highlightCode(component.htmlCode, "html");

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#0a0a0f]">
      {/* === Background Layers === */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, #000 50%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 to-transparent blur-[120px] dark:from-indigo-500/20" />
        <div className="absolute top-1/4 -right-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-cyan-400/10 to-transparent blur-[100px] dark:from-cyan-500/15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/50 py-1.5 pl-3 pr-4 text-sm font-medium text-neutral-600 backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:bg-white hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Kembali
        </Link>

        {/* Header */}
        <section className="mt-8 max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
              <Tag className="h-3 w-3" />
              {component.category.name}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-white">
            {component.title}
          </h1>

          {component.description && (
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {component.description}
            </p>
          )}

          {component.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {component.tags.map((tag) => (
                <span
                  key={tag.tag.id}
                  className="inline-flex items-center gap-1 rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500 dark:bg-white/5 dark:text-neutral-400"
                >
                  <Hash className="h-3 w-3" />
                  {tag.tag.name}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Gradient Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-white/10" />

        {/* Content Grid: Split View */}
        <section className="grid gap-8 lg:grid-cols-5">
          {/* === Preview Section === */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                  Preview
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  Tampilan visual component
                </p>
              </div>
            </div>

            {/* Sticky Preview Wrapper for Desktop */}
            <div className="lg:sticky lg:top-8">
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.02]">
                {/* Top Glow Line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

                {component.previewImage ? (
                  <PreviewImage
                    src={component.previewImage}
                    alt={component.title}
                  />
                ) : (
                  <div className="flex aspect-[16/10] h-full w-full items-center justify-center bg-neutral-50 dark:bg-[#0d0d14]">
                    <div
                      className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                      style={{
                        backgroundImage: `
                          linear-gradient(#000 1px, transparent 1px),
                          linear-gradient(to right, #000 1px, transparent 1px)
                        `,
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <span className="z-10 text-sm font-medium text-neutral-400 dark:text-neutral-600">
                      Preview belum tersedia
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* === Source Code Section === */}
          <aside className="min-w-0 space-y-4 lg:col-span-3">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                  Source Code
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  Salin dan gunakan pada proyekmu
                </p>
              </div>
            </div>

            {/* Code Editor Frame (Adaptive Light/Dark) */}
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm dark:border-white/[0.08] dark:bg-[#0d0d14] dark:shadow-lg dark:shadow-black/20">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 backdrop-blur-md dark:border-white/[0.06] dark:bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/70 transition-colors hover:bg-red-400 dark:bg-red-500/50" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70 transition-colors hover:bg-yellow-400 dark:bg-yellow-500/50" />
                  <span className="h-3 w-3 rounded-full bg-green-400/70 transition-colors hover:bg-green-400 dark:bg-green-500/50" />

                  <div className="ml-3 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="font-mono">{component.slug}.html</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 sm:flex dark:bg-white/5 dark:text-neutral-400">
                    HTML
                  </span>
                  <CopyCodeButton code={component.htmlCode} />
                </div>
              </div>

              {/* Code Content (Adaptive Text Color) */}
              <div
                className="
                  max-h-[600px] 
                  overflow-auto 
                  p-5 
                  text-[13px] 
                  leading-7
                  text-neutral-800 dark:text-neutral-200
                  custom-scroll-light dark:custom-scroll-dark
                  [&_pre]:!m-0 
                  [&_pre]:!bg-transparent 
                  [&_pre]:!p-0 
                  [&_pre]:font-mono
                  [&_pre]:whitespace-pre-wrap 
                  [&_pre]:break-words
                "
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
