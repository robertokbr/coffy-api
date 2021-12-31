import { Controller, Get, Post, Body, Query, Put } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderItemsDto } from '../dto/create-order-items.dto';
import { FindOrdersDto } from '../dto/find-orders.dto';
import { GetUser } from 'src/shared/decorators/get-user';
import { User } from '../entities/user.entity';
import { StateCode } from '../enums/order-state.enum';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @ApiResponse({
    description: 'Return the created order and the chosen items',
  })
  @Post()
  create(@Body() { items }: CreateOrderItemsDto, @GetUser() user: User) {
    return this.ordersService.create({
      code: StateCode.Waiting,
      customer: user,
      items,
    });
  }

  @Get()
  findAll(@Query() query: FindOrdersDto) {
    return this.ordersService.findAll(query);
  }

  @Put()
  update(@Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto);
  }
}
