import { IsObject, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import OrderItems from '../entities/order-items.entity';

export class CreateOrderDto {
  @IsObject()
  @ApiProperty()
  customer: JsonValue;

  @IsArray()
  @ApiProperty()
  items: OrderItems[];
}
