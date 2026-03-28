import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg"; // Ensure this is the same version as used by @prisma/adapter-pg

declare global {
    var cachedPrisma: PrismaClient | undefined;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString }); // Ensure this is the same version as used by @prisma/adapter-pg
    const adapter = new PrismaPg(pool as any);
    prisma = new PrismaClient({ adapter });
} else {
    if (!global.cachedPrisma) {
        const connectionString = process.env.DATABASE_URL;
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool as any);
        global.cachedPrisma = new PrismaClient({ adapter });
    }
    prisma = global.cachedPrisma;
}

export const db = prisma;