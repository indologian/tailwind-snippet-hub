import ComponentForm from "@/app/admin/components/_component/component-form";
import { getCategories } from "@/lib/queries/categories";

export default async function NewComponentPage() {
  const categories = await getCategories();

  return <ComponentForm mode="create" categories={categories} />;
}