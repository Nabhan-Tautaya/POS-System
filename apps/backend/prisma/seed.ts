import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcrypt";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Roles
  const platformAdminRole = await prisma.role.upsert({
    where: { name: "Platform Admin" },
    update: {},
    create: {
      name: "Platform Admin",
      description: "Platform administrator",
      updatedAt: new Date(),
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "Organization administrator",
      updatedAt: new Date(),
    },
  });

  const cashierRole = await prisma.role.upsert({
    where: { name: "Cashier" },
    update: {},
    create: {
      name: "Cashier",
      description: "Point of Sale cashier",
      updatedAt: new Date(),
    },
  });

  console.log("✅ Roles created");

  // Organization
  const organization = await prisma.organization.upsert({
    where: {
      name: "Demo Organization",
    },
    update: {},
    create: {
      name: "Demo Organization",
      updatedAt: new Date(),
    },
  });

  console.log("✅ Organization created");

  // Password
  const passwordHash = await bcrypt.hash("Admin123!", 10);

  // Platform Admin User
  await prisma.user.upsert({
    where: {
      email: "admin@demo.com",
    },
    update: {},
    create: {
      firstName: "Platform",
      lastName: "Admin",
      email: "admin@demo.com",
      passwordHash,
      organizationId: organization.id,
      roleId: platformAdminRole.id,
      updatedAt: new Date(),
    },
  });

  console.log("✅ Platform Admin created");

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
