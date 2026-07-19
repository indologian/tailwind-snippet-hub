import { Layers3, LayoutGrid, Pencil } from "lucide-react";
import Link from "next/link";

import DeleteButton from "@/components/shared/delete-buttton";
import { Button } from "@/components/ui/button";
import { getComponents } from "@/lib/queries/component";
import { SquarePen } from "lucide-react";

export default async function AdminPage() {
  const components = await getComponents();

  return (
    <main className="min-h-screen bg-muted/20 dark:bg-slate-950">
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

      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
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
          transition-all
          duration-300
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
                <LayoutGrid className="h-7 w-7 text-primary" />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Dashboard Admin
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Kelola seluruh component Tailwind CSS dengan mudah.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Add Component */}
              <Link href="/admin/components/new">
                <Button
                  className="
      h-11
      rounded-xl
      border
      border-primary/20
      bg-primary/10
      px-5
      text-primary
      shadow-none
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:border-primary/40
      hover:bg-primary/15
      hover:shadow-md
      hover:shadow-primary/10
      dark:border-primary/30
      dark:bg-primary/15
    "
                >
                  <SquarePen className="mr-2 h-4 w-4" />
                  Tambah Component
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
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
                  <p className="text-sm text-muted-foreground">
                    Total Component
                  </p>

                  <p className="text-2xl font-bold">{components.length}</p>
                </div>
              </div>
            </div>
          </Link>
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
            <h2 className="font-semibold">Daftar Component</h2>

            <p className="text-sm text-muted-foreground">
              Kelola, edit, atau hapus component.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-muted/40 dark:bg-slate-800/60">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Judul
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Kategori
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Slug
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-medium">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {components.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-16 text-center text-muted-foreground"
                    >
                      Belum ada component.
                    </td>
                  </tr>
                ) : (
                  components.map((item) => (
                    <tr
                      key={item.id}
                      className="
border-t
transition-colors
hover:bg-muted/40
dark:border-white/5
dark:hover:bg-white/5
"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium">{item.title}</div>
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
                          {item.category.name}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {item.slug}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/components/${item.id}/edit`}>
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

                          <DeleteButton id={item.id} title={item.title} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
