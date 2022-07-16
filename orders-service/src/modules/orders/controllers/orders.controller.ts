import { Controller, Get, Post, Body, Query, Put, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderItemsDto } from '../dto/create-order-items.dto';
import { FindOrdersDto } from '../dto/find-orders.dto';
import { GetUser } from 'src/shared/decorators/get-user';
import { StateCode } from '../enums/order-state.enum';
import { UpdateOrderDto } from '../dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { OrderDto } from '../dto/order.dto';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt-auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create an order specifying item ids and amounts.',
  })
  @ApiResponse({
    description: 'Return the created order and the chosen items',
    type: OrderDto,
  })
  @Post()
  async create(
    @Body() { items }: CreateOrderItemsDto,
    @GetUser() user: UserDto,
  ): Promise<OrderDto> {
    return this.ordersService.create({
      stateCode: StateCode.WAITING,
      customer: user,
      items,
    });
  }

  @ApiOperation({
    summary:
      'Get all order record or filter the result by order state code, id or created at params.',
  })
  @ApiResponse({
    type: [OrderDto],
  })
  @Get()
  async findAll(
    @Query() findOrderDto: FindOrdersDto,
  ): Promise<OrderDto[]> {
    return this.ordersService.findAll(findOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update an order state.',
  })
  @ApiResponse({
    type: OrderDto,
  })
  @Put(':id')
  async update(
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id') id: string,
  ): Promise<OrderDto> {
    return this.ordersService.update(updateOrderDto, +id);
  }
}
