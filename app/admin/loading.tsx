import { Layers3, LayoutGrid, Pencil } from "lucide-react";

export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-muted/20 dark:bg-slate-950">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="
            absolute
            left-1/2
            top-[-200px]
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-primary/10
            blur-3xl
            dark:bg-primary/20
          "
        />
      </div>

      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8 animate-pulse">
        {/* Header */}
        <section
          className="
            rounded-3xl
            border
            border-border/60
            bg-background/80
            p-6
            shadow-lg
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-slate-900/70
            dark:shadow-primary/5
          "
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Title */}
            <div className="flex items-center gap-4">
              <div
                className="
                  relative
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                  ring-1
                  ring-primary/20
                  before:absolute
                  before:inset-0
                  before:-z-10
                  before:rounded-2xl
                  before:bg-primary/20
                  before:blur-xl
                  dark:bg-primary/15
                  dark:ring-primary/30
                "
              >
                <LayoutGrid className="h-7 w-7 text-primary/50" />
              </div>

              <div>
                <div className="h-8 w-64 rounded-lg bg-muted dark:bg-slate-800" />
                <div className="mt-2 h-4 w-80 rounded bg-muted dark:bg-slate-800" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div
                className="
                  h-11
                  w-32
                  rounded-xl
                  border
                  border-border/70
                  bg-muted
                  dark:border-white/10
                  dark:bg-slate-800
                "
              />

              <div
                className="
                  h-11
                  w-44
                  rounded-xl
                  border
                  border-primary/20
                  bg-primary/10
                  dark:border-primary/30
                  dark:bg-primary/15
                "
              />

              <div className="flex items-center gap-3">
                <div
                  className="
                    h-11
                    w-28
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                  "
                />

                <div
                  className="
                    h-11
                    w-11
                    rounded-xl
                    border
                    border-border
                    bg-muted
                    dark:border-white/10
                    dark:bg-slate-800
                  "
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="
              rounded-2xl
              border
              bg-background
              p-5
              shadow-sm
              dark:border-white/10
              dark:bg-slate-900
            "
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Layers3 className="h-5 w-5 text-primary/40" />
              </div>

              <div>
                <div className="h-4 w-28 rounded bg-muted dark:bg-slate-800" />
                <div className="mt-2 h-8 w-12 rounded bg-muted dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </section>

        {/* Table */}
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
            <div className="h-5 w-44 rounded bg-muted dark:bg-slate-800" />

            <div className="mt-2 h-4 w-72 rounded bg-muted dark:bg-slate-800" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-muted/40 dark:bg-slate-800/60">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="h-4 w-16 rounded bg-muted dark:bg-slate-700" />
                  </th>

                  <th className="px-6 py-4 text-left">
                    <div className="h-4 w-20 rounded bg-muted dark:bg-slate-700" />
                  </th>

                  <th className="px-6 py-4 text-left">
                    <div className="h-4 w-16 rounded bg-muted dark:bg-slate-700" />
                  </th>

                  <th className="px-6 py-4 text-right">
                    <div className="ml-auto h-4 w-12 rounded bg-muted dark:bg-slate-700" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr
                    key={index}
                    className="
                      border-t
                      transition-colors
                      dark:border-white/5
                    "
                  >
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="h-5 w-52 rounded-md bg-muted dark:bg-slate-800" />

                        <div className="h-3 w-32 rounded-md bg-muted/80 dark:bg-slate-700" />
                      </div>
                    </td>

                    {/* kategori */}
                    <td className="px-6 py-4">
                      <div
                        className="
                          h-7
                          w-24
                          rounded-full
                          border
                          border-primary/20
                          bg-primary/10
                          dark:border-primary/30
                          dark:bg-primary/20
                        "
                      />
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-4">
                      <div className="h-4 w-40 rounded-md bg-muted dark:bg-slate-800" />
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-border
                            bg-muted
                            dark:border-white/10
                            dark:bg-slate-800
                          "
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground/40" />
                        </div>

                        <div
                          className="
                            h-9
                            w-9
                            rounded-xl
                            border
                            border-border
                            bg-muted
                            dark:border-white/10
                            dark:bg-slate-800
                          "
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
