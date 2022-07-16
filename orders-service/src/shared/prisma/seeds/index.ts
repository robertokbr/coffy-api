import { PrismaClient } from '.prisma/client';
import ItemsSeed from './items.seed';

const client = new PrismaClient();

const seeds = [ItemsSeed];

seeds.reduce(async (promise, seed) => {
  await promise;
  return seed.run(client);
}, Promise.resolve());

