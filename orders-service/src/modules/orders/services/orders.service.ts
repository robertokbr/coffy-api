import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { FindOrdersDto } from '../dto/find-orders.dto';
import { OrdersRepository } from '../repositories/orders.repository';
import { WebsocketGatewayProvider } from '../../common/providers/websocket-gateway.provider';
import { OrderDto } from '../dto/order.dto';
import { ItemsService } from '../../../modules/items/services/items.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly websocketGatewayProvider: WebsocketGatewayProvider,
    private readonly itemsService: ItemsService,
  ) {}

  async create(data: CreateOrderDto) {
    const ids = data.items.map(item => item.id);

    const items = await this.itemsService.findByIds(ids);

    if (items.length !== ids.length) {
      throw new NotFoundException('One or more items do not exist');
    }

    const order = await this.ordersRepository.create(data);
    
    this.websocketGatewayProvider.emitOrderCreatedEvent(JSON.stringify(order));

    return OrderDto.fromEntity(order);
  }

  async findAll(query: FindOrdersDto) {
    const orders = await this.ordersRepository.find(query);

    return orders.map((order) => OrderDto.fromEntity(order));
  }

  async update(updateOrderDto: UpdateOrderDto, id: number) {
    const [oders] = await this.ordersRepository.find({
      id,
    });

    if (!oders) throw new NotFoundException('The order does not exist');
    
    const order = await this.ordersRepository.save(updateOrderDto, id);

    this.websocketGatewayProvider.emitOrderUpdatedEvent(JSON.stringify(order));

    return OrderDto.fromEntity(order);
  }
}
