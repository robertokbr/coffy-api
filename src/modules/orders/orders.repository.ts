import { Orders, PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';

@Injectable()
export class OrdersRepository {
  private client = new PrismaClient().orders;

  public async create(data: CreateOrderDto) {
    const { items, ...dto } = data;

    return this.client.create({
      include: {
        items: true,
      },
      data: {
        ...dto,
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

  public async find(query?: FindOrdersDto) {
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

  public async save(order: Partial<Orders>) {
    return this.client.update({
      data: order,
      where: {
        id: order.id,
      },
    });
  }
}
