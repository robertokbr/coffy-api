import { PrismaClient } from 'prisma/prisma-client';
import { StateCode } from '../../../modules/orders/enums/order-state.enum';
import { logger } from '../../logger';

export default class OrderStateSeeds {
  static async run(client: PrismaClient) {
    logger.info({ context: 'PRISMA', message: '🌱 Running OrderState seeds' });

    await client.orderState.createMany({
      data: [
        {
          code: StateCode.Waiting,
          description: 'Waiting for state change',
        },
        {
          code: StateCode.Preparing,
          description: 'Order in preparing',
        },
        {
          code: StateCode.Canceled,
          description: 'Order canceled',
        },
        {
          code: StateCode.Done,
          description: 'Order preparing is done',
        },
      ],
    });
  }
}
