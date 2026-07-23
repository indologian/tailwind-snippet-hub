// app/admin/page.tsx

import { getComponents } from "@/lib/queries/component";
import { ComponentTable } from "./_components/component-table";
import { DashboardHeader } from "./_components/dashboard-header";
import { StatsCard } from "./_components/stats-card";

const ADMIN_PAGE_SIZE = 10;

interface AdminPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, Number(resolvedSearchParams.page) || 1);

  const { components, totalCount, currentPage, totalPages } =
    await getComponents(page, ADMIN_PAGE_SIZE);

  return (
    <main className="min-h-screen bg-muted/20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
        <DashboardHeader />

        {/* Total keseluruhan, bukan cuma yang tampil di halaman ini */}
        <StatsCard total={totalCount} />

        <ComponentTable
          components={components}
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={resolvedSearchParams}
        />
      </div>
    </main>
  );
}