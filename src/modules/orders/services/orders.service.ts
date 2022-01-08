import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../orders.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { FindOrdersDto } from '../dto/find-orders.dto';
import { ItemsRepository } from '../items.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly itemsRepository: ItemsRepository,
  ) {}

  async create(data: CreateOrderDto) {
    return this.ordersRepository.create(data);
  }

  async findAll(query: FindOrdersDto) {
    return this.ordersRepository.find(query);
  }

  async update({ stateCode }: UpdateOrderDto, id: number) {
    return this.ordersRepository.save({
      stateCode,
      id,
    });
  }
}
