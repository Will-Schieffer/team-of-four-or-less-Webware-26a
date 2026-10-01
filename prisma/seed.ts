import { PrismaClient, UtilityCategory } from '@prisma/client';
import { readFileSync } from 'node:fs';

const prisma = new PrismaClient();
const load = (f: string) => JSON.parse(readFileSync(`data/${f}`, 'utf-8'));

async function main() {
  for (const p of load('places.json')) {
    await prisma.place.upsert({ where: { zip: p.zip }, update: p, create: p });
  }

  for (const p of load('providers.json')) {
    await prisma.provider.upsert({ where: { name: p.name }, update: p, create: p });
  }

  for (const o of load('offerings.json')) {
    const provider = await prisma.provider.findUniqueOrThrow({ where: { name: o.provider } });
    const category = o.category as UtilityCategory;
    await prisma.offering.upsert({
      where: { zip_providerId_category: { zip: o.zip, providerId: provider.id, category } },
      update: {},
      create: { zip: o.zip, providerId: provider.id, category },
    });
  }
}

main().finally(() => prisma.$disconnect());