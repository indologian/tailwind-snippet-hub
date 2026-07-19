import { CategoryList } from "@/features/category/category-list";
import { ComponentGrid } from "@/features/component/component-grid";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const [categories, components] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.component.findMany({
      where: { categoryId: category.id },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{category.name}</h1>
        <p className="mt-2 text-slate-600">{components.length} komponen</p>
      </div>

      <CategoryList categories={categories} activeSlug={slug} />
      <ComponentGrid components={components} />
    </div>
  );
}
