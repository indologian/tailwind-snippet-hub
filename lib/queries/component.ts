// lib/queries/component.ts
import { prisma } from "@/lib/prisma";

const DEFAULT_PAGE_SIZE = 8;

export type ComponentSortField = "title" | "slug" | "createdAt" | "category";
export type SortOrder = "asc" | "desc";

interface GetComponentsOptions {
  search?: string;
  sort?: ComponentSortField;
  order?: SortOrder;
}

export async function getComponents(
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  options: GetComponentsOptions = {},
) {
  const currentPage = Math.max(1, page);
  const skip = (currentPage - 1) * pageSize;

  const { search, sort = "createdAt", order = "desc" } = options;

  // === Search ===
  const where = search
    ? {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { slug: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
      ],
    }
    : {};

  // === Sort ===
  // category butuh relational orderBy
  const orderBy =
    sort === "category"
      ? { category: { name: order } }
      : { [sort]: order };

  const [components, totalCount] = await Promise.all([
    prisma.component.findMany({
      where,
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy,
      skip,
      take: pageSize,
    }),
    prisma.component.count({ where }), // <- count juga ikut filter search
  ]);

  return {
    components,
    totalCount,
    currentPage,
    pageSize,
    totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
  };
}

export async function getComponent(id: string) {
  try {
    return await prisma.component.findUnique({
      where: { id },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getComponentBySlug(slug: string) {
  try {
    return await prisma.component.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getComponentsByCategory(categoryId: string) {
  return prisma.component.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}