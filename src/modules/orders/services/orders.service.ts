import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../orders.repository';
import { Order } from '../../../shared/prisma/entities';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(data: CreateOrderDto) {
    return this.ordersRepository.create(data);
  }

  async findAll(query?: Partial<Order>) {
    return this.ordersRepository.find({
      customer: query.customer,
      ...query,
    });
  }

  async update({ id, code }: UpdateOrderDto) {
    return this.ordersRepository.save({
      id,
      code,
    });
  }
}
