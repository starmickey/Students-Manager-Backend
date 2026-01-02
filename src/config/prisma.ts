import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
import { env } from "./env.ts";

const connectionString = env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

// Extend global type (Node.js only)
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export async function disconnectPrisma() {
  if (env.NODE_ENV === "test") {
    await prisma.$disconnect();
  }
}
