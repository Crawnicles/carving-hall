import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | undefined;

export const getDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
};
