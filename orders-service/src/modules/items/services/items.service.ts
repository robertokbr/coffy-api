import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../repositories/items.repository';

@Injectable()
export class ItemsService {
  constructor(
    private readonly itemsRepository: ItemsRepository,
  ) {}

  findAll() {
    return this.itemsRepository.find();
  }

  findByIds(ids: number[]) {
    return this.itemsRepository.findByIds(ids);
  }
}
