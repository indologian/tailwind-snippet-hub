// app/admin/_components/component-table.tsx
import {
  getComponents,
  type ComponentSortField,
  type SortOrder,
} from "@/lib/queries/component";
import { ComponentRow } from "./component-row";
import { ComponentTableToolbar } from "./component-table-toolbar";
import { EmptyState } from "./empty-state";
import { AdminPagination } from "./pagination";
import { SortableTh } from "./sortable-th";

type ComponentTableProps = {
  components: Awaited<ReturnType<typeof getComponents>>["components"];
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string | string[] | undefined>;
  search: string;
  sort: ComponentSortField;
  order: SortOrder;
};

export type ComponentItem = ComponentTableProps["components"][number];

export function ComponentTable({
  components,
  currentPage,
  totalPages,
  searchParams,
  search,
  sort,
  order,
}: ComponentTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-background shadow-sm dark:border-white/10 dark:bg-slate-900">
      <div className="border-b px-6 py-5">
        <h2 className="font-semibold">Daftar Component</h2>
        <p className="text-sm text-muted-foreground">
          Kelola, edit, atau hapus component.
        </p>
      </div>

      {/* Toolbar sekarang hanya butuh initialSearch */}
      <ComponentTableToolbar initialSearch={search} />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/40 dark:bg-slate-800/60">
            <tr>
              <SortableTh
                label="Judul"
                field="title"
                currentSort={sort}
                currentOrder={order}
              />
              <SortableTh
                label="Kategori"
                field="category"
                currentSort={sort}
                currentOrder={order}
              />
              <SortableTh
                label="Slug"
                field="slug"
                currentSort={sort}
                currentOrder={order}
              />
              <th className="px-6 py-4 text-right text-sm font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {components.length === 0 ? (
              <EmptyState isSearching={!!search} />
            ) : (
              components.map((component) => (
                <ComponentRow key={component.id} component={component} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    </section>
  );
}
