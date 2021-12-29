import { IsNumber, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';

export default class OrderState {
  @IsNumber()
  @ApiProperty()
  code: number;

  @IsString()
  @ApiProperty()
  description: string;

  @IsArray()
  @ApiProperty()
  orders: Order[];
}
