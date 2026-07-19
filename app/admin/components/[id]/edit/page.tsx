import { notFound } from "next/navigation";

import ComponentForm from "@/app/admin/components/_component/component-form";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditComponentPage({ params }: Props) {
  const { id } = await params;

  const component = await prisma.component.findUnique({
    where: {
      id,
    },
  });

  if (!component) {
    notFound();
  }

  return (
    <ComponentForm
      mode="edit"
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
