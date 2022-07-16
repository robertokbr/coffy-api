import { PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsRepository {
  private client = new PrismaClient().items;

  public async find() {
    return this.client.findMany({
      where: { isAvailable: true },
    });
  }

  findByIds(ids: number[]) {
    return this.client.findMany({
      where: { id: { in: ids } },
    });
  }
}
