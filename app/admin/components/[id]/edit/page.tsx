import ComponentForm from "@/app/admin/components/_component/component-form";
import { getComponent } from "@/lib/queries/component";
import { getCategories } from "@/lib/queries/categories";
import { notFound } from "next/navigation";

export default async function EditComponentPage({
  params,
}: {
  params: { id: string };
}) {
  const [component, categories] = await Promise.all([
    getComponent(params.id),
    getCategories(),
  ]);

  if (!component) {
    notFound();
  }

  return (
    <ComponentForm
      mode="edit"
      categories={categories}
      initialData={{
        id: component.id,
        title: component.title,
        slug: component.slug,
        description: component.description,
        htmlCode: component.htmlCode,
        categoryId: component.categoryId,
        previewImage: component.previewImage,
      }}
    />
  );
}