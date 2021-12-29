import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { StateCode } from './enums/order-state.enum';
import OrdersRepository from './orders.repository';

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

  async findAll(query: Partial<Order>) {
    return this.ordersRepository.find({
      customer: query.customer,
      ...query,
    });
  }

  async findOne(id: number) {
    return new Order();
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return new Order();
  }
}
