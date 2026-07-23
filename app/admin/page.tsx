// app/admin/page.tsx
import { getComponents, type ComponentSortField, type SortOrder } from "@/lib/queries/component";
import { ComponentTable } from "./_components/component-table";
import { DashboardHeader } from "./_components/dashboard-header";
import { StatsCard } from "./_components/stats-card";

const ADMIN_PAGE_SIZE = 10;

interface AdminPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function pick(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const VALID_SORT: ComponentSortField[] = ["title", "slug", "createdAt", "category"];

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const sp = await searchParams;

  const page = Math.max(1, Number(pick(sp.page)) || 1);
  const search = pick(sp.q) ?? "";
  const sortRaw = pick(sp.sort) ?? "createdAt";
  const sort: ComponentSortField = VALID_SORT.includes(sortRaw as ComponentSortField)
    ? (sortRaw as ComponentSortField)
    : "createdAt";
  const order: SortOrder = pick(sp.order) === "asc" ? "asc" : "desc";

  const { components, totalCount, currentPage, totalPages } = await getComponents(
    page,
    ADMIN_PAGE_SIZE,
    { search, sort, order },
  );

  return (
    <main className="min-h-screen bg-muted/20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
        <DashboardHeader />
        <StatsCard total={totalCount} />
        <ComponentTable
          components={components}
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={sp}
          sort={sort}
          order={order}
          search={search}
        />
      </div>
    </main>
  );
}