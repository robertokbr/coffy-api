import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { StateCode } from './enums/order-state.enum';
import OrdersRepository from './orders.repository';
import { Order } from '../../shared/prisma/entities';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create({ customer, items }: CreateOrderDto) {
    return this.ordersRepository.create({
      code: StateCode.Waiting,
      customer,
      items,
    });
  }

  async findAll(query?: Partial<Order>) {
    return this.ordersRepository.find({
      customer: query.customer,
      ...query,
    });
  }
}
