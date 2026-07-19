import { Pencil } from "lucide-react";
import Link from "next/link";

import DeleteButton from "@/components/shared/delete-buttton";
import { Button } from "@/components/ui/button";

import type { ComponentItem } from "./component-table";

type ComponentRowProps = {
  component: ComponentItem;
};

export function ComponentRow({ component }: ComponentRowProps) {
  return (
    <tr
      key={component.id}
      className="
border-t
transition-colors
hover:bg-muted/40
dark:border-white/5
dark:hover:bg-white/5
"
    >
      <td className="px-6 py-4">
        <div className="font-medium">{component.title}</div>
      </td>

      <td className="px-6 py-4">
        <span
          className="
  rounded-full
  border
  border-primary/20
  bg-primary/10
  px-3
  py-1
  text-xs
  font-medium
  text-primary
  dark:border-primary/30
  dark:bg-primary/20
"
        >
          {component.category.name}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-muted-foreground">
        {component.slug}
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <Link href={`/admin/components/${component.id}/edit`}>
            <Button
              size="icon"
              variant="outline"
              className="
    rounded-xl
    transition-all
    hover:scale-105
    dark:border-white/10
    dark:hover:bg-primary/10
  "
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>

          <DeleteButton id={component.id} title={component.title} />
        </div>
      </td>
    </tr>
  );
}
