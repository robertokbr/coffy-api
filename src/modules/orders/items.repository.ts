import { Item, PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateItemsDto } from './dto/create-item.dto';

@Injectable()
export class ItemsRepository {
  private client = new PrismaClient().item;

  public async create(data: CreateItemsDto) {
    return this.client.create({
      data,
    });
  }

  public async find(query?: Partial<Item>) {
    return this.client.findMany({
      where: { ...query },
    });
  }

  public async save(item: Item) {
    return this.client.update({
      data: item,
      where: {
        id: item.id,
      },
    });
  }
}
