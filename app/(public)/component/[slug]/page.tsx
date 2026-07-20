import { ArrowLeft, Copy, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyCodeButton } from "@/components/shared/copy-code-button";
import { getComponentBySlug } from "@/lib/queries/component";
Copy;

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

  console.log(slug, component);

  return (
    <main className="min-h-screen bg-muted/20 dark:bg-slate-950">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-[-250px]
            h-[550px]
            w-[550px]
            -translate-x-1/2
            rounded-full
            bg-primary/10
            blur-3xl
            dark:bg-primary/20
          "
        />
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        {/* Back */}
        <Link
          href="/"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-muted-foreground
            hover:text-primary
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>

        {/* Preview */}
        {component.previewImage && (
          <section
            className="
              overflow-hidden
              rounded-3xl
              border
              bg-background
              dark:border-white/10
              dark:bg-slate-900
            "
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={component.previewImage}
              alt={component.title}
              className="w-full"
            />
          </section>
        )}

        {/* Header */}
        <section
          className="
            rounded-3xl
            border
            bg-background
            p-8
            dark:border-white/10
            dark:bg-slate-900
          "
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold">{component.title}</h1>

                <p className="mt-3 text-muted-foreground">
                  {component.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-primary/20
                    bg-primary/10
                    px-3
                    py-1
                    text-sm
                    text-primary
                  "
                >
                  <Tag className="h-4 w-4" />

                  {component.category.name}
                </span>

                {component.tags.map((tag) => (
                  <span
                    key={tag.tag.id}
                    className="
                      rounded-full
                      bg-muted
                      px-3
                      py-1
                      text-xs
                    "
                  >
                    {tag.tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section
          className="
            rounded-3xl
            border
            bg-background
            p-8
            dark:border-white/10
            dark:bg-slate-900
          "
        >
          <h2 className="mb-6 text-xl font-semibold">Live Preview</h2>

          <div
            className="
              rounded-2xl
              border
              bg-white
              p-10
              dark:border-white/10
              dark:bg-slate-950
            "
            dangerouslySetInnerHTML={{
              __html: component.htmlCode,
            }}
          />
        </section>

        {/* Source */}
        <section
          className="
            rounded-3xl
            border
            bg-background
            p-8
            dark:border-white/10
            dark:bg-slate-900
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Source Code</h2>

            <CopyCodeButton code={component.htmlCode} />
          </div>

          <pre
            className="
              overflow-auto
              rounded-2xl
              bg-slate-950
              p-6
              text-sm
              text-slate-100
            "
          >
            <code>{component.htmlCode}</code>
          </pre>
        </section>
      </div>
    </main>
  );
}
