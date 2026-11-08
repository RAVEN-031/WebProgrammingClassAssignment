import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

try {
  process.loadEnvFile('.env');
} catch {
  // No .env (fresh clone or CI): DATABASE_URL must come from the environment.
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });

export default prisma;
