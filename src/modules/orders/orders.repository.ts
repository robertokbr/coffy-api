import { Order, OrderItems, PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class OrdersRepository {
  private client = new PrismaClient().order;

  public async create({
    items,
    code,
    customer,
  }: Pick<Order, 'code' | 'customer'> & { items: OrderItems[] }) {
    return this.client.create({
      data: {
        code,
        customer,
        items: {
          createMany: {
            data: items.map((item) => item),
          },
        },
      },
    });
  }

  public async find(query?: Partial<Order>) {
    const { customer, ...rest } = query;

    return this.client.findMany({
      where: {
        ...rest,
        customer: {
          equals: customer,
        },
      },
    });
  }

  public async save(order: Order) {
    return this.client.update({
      data: order,
      where: {
        id: order.id,
      },
    });
  }
}
