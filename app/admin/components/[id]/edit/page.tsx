import ComponentForm from "@/app/admin/components/_component/component-form";
import { getCategories } from "@/lib/queries/categories";
import { getComponent } from "@/lib/queries/component";
import { notFound } from "next/navigation";

export default async function EditComponentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [component, categories] = await Promise.all([
    getComponent(id),
    getCategories(),
  ]);

  if (!component) {
    console.log("eeroror");
    notFound();
  }

  console.log(component);

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
