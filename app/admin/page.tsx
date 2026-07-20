import { getComponents } from "@/lib/queries/component";
import { ComponentTable } from "./_components/component-table";
import { DashboardHeader } from "./_components/dashboard-header";
import { StatsCard } from "./_components/stats-card";

export default async function AdminPage() {
  const components = await getComponents();

  return (
    <main className="min-h-screen bg-muted/20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
        <DashboardHeader />

        {/* Stats */}
        <StatsCard total={components.length} />

        {/* Table */}
        <ComponentTable components={components} />
      </div>
    </main>
  );
}
