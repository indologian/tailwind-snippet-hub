import { Badge } from "@/components/ui/badge";
import type { ComponentWithRelations } from "@/types";
import { ArrowUpRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LinkPendingOverlay } from "@/components/shared/link-pending-overlay";


export function ComponentCard({
  component,
}: {
  component: ComponentWithRelations;
}) {
  return (
    <Link
      href={`/component/${component.slug}`}
      className="
        group
        relative
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-neutral-200/80
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1.5
        hover:border-indigo-500/30
        hover:shadow-xl
        hover:shadow-indigo-500/10
        dark:border-white/[0.08]
        dark:bg-white/[0.02]
        dark:hover:border-indigo-400/30
      "
    >
      <LinkPendingOverlay />
      {/* Top Glow Line on Hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Image / Preview Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-50 dark:bg-[#0d0d14]">
        {component.previewImage ? (
          <Image
            src={component.previewImage}
            alt={component.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="
              object-cover
              transition-transform
              duration-500
              ease-out
              group-hover:scale-105
            "
          />
        ) : (
          /* Futuristic Grid Empty State */
          <div className="flex h-full w-full items-center justify-center">
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
            <div className="z-10 flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-600">
              <Eye className="h-8 w-8" strokeWidth={1.5} />
              <span className="text-xs font-medium uppercase tracking-wider">
                No Preview
              </span>
            </div>
          </div>
        )}

        {/* Category Badge (Overlaid on Image) */}
        <div className="absolute left-3 top-3 z-10">
          <Badge
            variant="secondary"
            className="
              rounded-full
              border
              border-white/20
              bg-white/70
              text-neutral-700
              backdrop-blur-md
              dark:border-white/10
              dark:bg-black/50
              dark:text-neutral-200
            "
          >
            {component.category.name}
          </Badge>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 items-center justify-between gap-3 p-5">
        <div className="flex-1 overflow-hidden">
          <h3
            className="
              truncate
              text-base
              font-semibold
              tracking-tight
              text-neutral-900
              transition-colors
              group-hover:text-indigo-600
              dark:text-white
              dark:group-hover:text-indigo-400
            "
          >
            {component.title}
          </h3>
          <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
            View details & code
          </p>
        </div>

        {/* Animated Action Icon */}
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-neutral-100
            text-neutral-500
            transition-all
            duration-300
            group-hover:bg-indigo-600
            group-hover:text-white
            dark:bg-white/5
            dark:text-neutral-400
            dark:group-hover:bg-indigo-500
          "
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </div>
      </div>
    </Link>
  );
}
