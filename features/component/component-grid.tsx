// features/component/component-grid.tsx

import type { ComponentWithRelations } from "@/types";
import { ComponentCard } from "./component-card";

export function ComponentGrid({
  components,
}: {
  components: ComponentWithRelations[];
}) {
  if (components.length === 0) {
    return (
      <div
        className="
          rounded-xl
          border
          border-dashed
          border-border
          bg-muted/50
          py-16
          text-center
          text-muted-foreground
        "
      >
        Tidak ada komponen ditemukan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {components.map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  );
}
