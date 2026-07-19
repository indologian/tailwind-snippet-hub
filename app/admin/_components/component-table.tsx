import { getComponents } from "@/lib/queries/component";
import { ComponentRow } from "./component-row";
import { EmptyState } from "./empty-state";

type ComponentTableProps = {
  components: Awaited<ReturnType<typeof getComponents>>;
};

export type ComponentItem = ComponentTableProps["components"][number];

export function ComponentTable({ components }: ComponentTableProps) {
  return (
    <section
      className="
  overflow-hidden
  rounded-2xl
  border
  bg-background
  shadow-sm
  dark:border-white/10
  dark:bg-slate-900
"
    >
      <div className="border-b px-6 py-5">
        <h2 className="font-semibold">Daftar Component</h2>

        <p className="text-sm text-muted-foreground">
          Kelola, edit, atau hapus component.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-muted/40 dark:bg-slate-800/60">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium">Judul</th>

              <th className="px-6 py-4 text-left text-sm font-medium">
                Kategori
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium">Slug</th>

              <th className="px-6 py-4 text-right text-sm font-medium">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {components.length === 0 ? (
              <EmptyState />
            ) : (
              components.map((component) => (
                <ComponentRow key={component.id} component={component} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
