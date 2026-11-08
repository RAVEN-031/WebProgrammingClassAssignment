import { prisma } from '../lib/prisma.js';

const products = [
  { id: 1, name: 'Buku', price: 15000 },
  { id: 2, name: 'Pulpen', price: 5000 },
];

for (const data of products) {
  await prisma.product.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

// Seed rows carry explicit ids, which does not advance the SERIAL sequence.
// Without this the next autoincrement insert collides with id 1.
await prisma.$queryRaw`SELECT setval(pg_get_serial_sequence('"Product"', 'id'), (SELECT MAX(id) FROM "Product"))`;

await prisma.$disconnect();
