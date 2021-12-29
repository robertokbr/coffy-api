import { PrismaClient } from '.prisma/client';
import OrderStateSeeds from './order-state.seeds';

const client = new PrismaClient();

const seeds = [OrderStateSeeds];

seeds.forEach((seed) => {
  seed.run(client);
});
