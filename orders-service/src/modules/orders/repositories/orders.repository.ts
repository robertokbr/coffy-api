import { Orders, PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { FindOrdersDto } from '../dto/find-orders.dto';

@Injectable()
export class OrdersRepository {
  private client = new PrismaClient().orders;

  public async create(data: CreateOrderDto) {
    const { items, customer, stateCode } = data;

    return this.client.create({
      include: {
        items: true,
      },
      data: {
        stateCode,
        customer: JSON.stringify(customer),
        items: {
          createMany: {
            data: items.map(({ amount, id }) => ({
              itemId: id,
              amount,
            })),
          },
        },
      },
    });
  }

  public async find(query: FindOrdersDto) {

    return this.client.findMany({
      where: {
        ...query,
      },
    });
  }

  public async save(order: Partial<Orders>, id: number) {
    return this.client.update({
      data: order,
      where: {
        id,
      },
    });
  }
}
