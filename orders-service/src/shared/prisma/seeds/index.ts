import { PrismaClient } from '.prisma/client';
import ItemsSeed from './items.seed';
import OrderStateSeed from './order-state.seed';

const client = new PrismaClient();

const seeds = [OrderStateSeed, ItemsSeed];

seeds.reduce(async (promise, seed) => {
  await promise;
  return seed.run(client);
}, Promise.resolve());

