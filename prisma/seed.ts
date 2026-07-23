import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const categories = [
  "Accordion",
  "Alert",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Card",
  "Carousel",
  "Dashboard",
  "Dropdown",
  "Footer",
  "Form",
  "Hero",
  "Input",
  "Login",
  "Modal",
  "Navbar",
  "Pagination",
  "Pricing",
  "Register",
  "Sidebar",
  "Skeleton",
  "Table",
  "Tabs",
  "Testimonial",
];

const tags = [
  "Responsive",
  "Dark Mode",
  "Animation",
  "Hover",
  "Gradient",
  "Glassmorphism",
  "Dashboard",
  "Landing Page",
  "Portfolio",
  "Admin",
  "Ecommerce",
  "Pricing",
  "Authentication",
  "Mobile",
  "Desktop",
  "Minimal",
  "Modern",
  "Tailwind CSS",
  "Shadcn UI",
  "Accessible",
];

async function main() {
  console.log("🌱 Seeding...");

  // ===========================
  // Categories
  // ===========================
  const categoryRecords = [];

  for (const category of categories) {
    const record = await prisma.category.upsert({
      where: {
        slug: slugify(category),
      },
      update: {},
      create: {
        name: category,
        slug: slugify(category),
      },
    });

    categoryRecords.push(record);
  }

  // ===========================
  // Tags
  // ===========================
  const tagRecords = [];

  for (const tag of tags) {
    const record = await prisma.tag.upsert({
      where: {
        name: tag,
      },
      update: {},
      create: {
        name: tag,
      },
    });

    tagRecords.push(record);
  }

  // ===========================
  // Admin
  // ===========================
  const password = await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@example.com",
      password,
    },
  });

  // ===========================
  // Components
  // ===========================

  for (let i = 1; i <= 30; i++) {
    const category =
      categoryRecords[Math.floor(Math.random() * categoryRecords.length)];

    const component = await prisma.component.upsert({
      where: {
        slug: `component-${ i }`,
      },
      update: {},
      create: {
        title: `Beautiful ${ category.name } ${ i }`,
        slug: `component-${ i }`,
        description: `Dummy component ${ i } for ${ category.name }.`,
        categoryId: category.id,
        previewImage: `https://picsum.photos/seed/component-${ i }/800/600`,
        htmlCode: `
<div class="rounded-xl border p-6 shadow-lg">
  <h2 class="text-xl font-bold">
    Dummy Component ${ i }
  </h2>

  <p class="mt-2 text-gray-500">
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </p>

  <button class="mt-4 rounded bg-black px-4 py-2 text-white">
    Get Started
  </button>
</div>
        `,
      },
    });

    // pilih 2-4 tag random
    const shuffled = [...tagRecords].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.floor(Math.random() * 3) + 2);

    for (const tag of selected) {
      await prisma.componentTag.upsert({
        where: {
          componentId_tagId: {
            componentId: component.id,
            tagId: tag.id,
          },
        },
        update: {},
        create: {
          componentId: component.id,
          tagId: tag.id,
        },
      });
    }
  }

  console.log("✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });