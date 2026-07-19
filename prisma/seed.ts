import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateSlug } from "../lib/utils";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // ==========================
  // Admin
  // ==========================

  const password = await bcrypt.hash("admin123", 12);

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

  console.log("✅ Admin created");

  // ==========================
  // Categories
  // ==========================

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

  for (const name of categories) {
    await prisma.category.upsert({
      where: {
        slug: generateSlug(name),
      },
      update: {},
      create: {
        name,
        slug: generateSlug(name),
      },
    });
  }

  console.log("✅ Categories created");

  // ==========================
  // Tags
  // ==========================

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

  for (const name of tags) {
    await prisma.tag.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });
  }

  console.log("✅ Tags created");

  console.log("🎉 Seed finished");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });