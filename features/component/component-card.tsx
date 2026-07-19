import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ComponentWithRelations } from "@/types";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ComponentCard({
  component,
}: {
  component: ComponentWithRelations;
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-xl
        border
        border-border
        bg-card
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
          bg-muted
        "
      >
        {component.previewImage ? (
          <Image
            src={component.previewImage}
            alt={component.title}
            fill
            className="
              object-cover
              transition
              duration-300
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-sm
              text-muted-foreground
            "
          >
            No preview
          </div>
        )}
      </div>

      <div className="space-y-3 p-5">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">{component.title}</h3>

          <Badge
            variant="secondary"
            className="
              rounded-full
              bg-primary/10
              text-primary
              hover:bg-primary/20
            "
          >
            {component.category.name}
          </Badge>
        </div>

        <Button
          render={<Link href={`/component/${component.slug}`} />}
          nativeButton={false}
          variant="outline"
          className="w-full rounded-xl"
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </div>
    </article>
  );
}
