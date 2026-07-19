import { Layers3 } from "lucide-react";
import Link from "next/link";

type StatsCardProps = {
  total: number;
};

export function StatsCard({ total }: StatsCardProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Link href="/">
        <div
          className="
  rounded-2xl
  border
  bg-background
  p-5
  shadow-sm
  transition-all
  hover:-translate-y-1
  hover:shadow-lg
  dark:border-white/10
  dark:bg-slate-900
  dark:hover:border-primary/40
  dark:hover:shadow-primary/10
"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <Layers3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Component</p>

              <p className="text-2xl font-bold">{total}</p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
