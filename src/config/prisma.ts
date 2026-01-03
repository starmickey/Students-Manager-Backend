import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
import { env } from "./env.ts";
import { logger } from "./logger.ts";

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
    log:
      env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export async function databaseConnect() {
  try {
    await prisma.$connect();

    // Run a sample query to test the database connection
    await prisma.$queryRaw`SELECT 1`;

    logger.info("Connected to database");
  } catch (error) {
    logger.error(error);
    throw Error("Could not connect to the database");
  }
}

export async function databaseDisconnect() {
  await prisma.$disconnect();
}
