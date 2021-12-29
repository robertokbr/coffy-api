import {
  IsNumber,
  IsDate,
  IsArray,
  IsObject,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Customer from './customer.entity';
import OrderItems from './order-items.entity';
import { OrderState } from '.prisma/client';

export class Order {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsObject()
  @ApiProperty()
  customer: Customer;

  @IsNumber()
  @ApiProperty()
  code: number;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsArray()
  @ApiProperty()
  items: OrderItems[];

  @IsObject()
  @IsOptional()
  @ApiProperty()
  orderState: OrderState | null;
}
