import { IsNumber, IsBoolean, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';
import { Item } from '.prisma/client';

export default class OrderItems {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNumber()
  @ApiProperty()
  orderId: number;

  @IsNumber()
  @ApiProperty()
  itemId: number;

  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsBoolean()
  @ApiProperty()
  isValid = true;

  @IsObject()
  @IsOptional()
  @ApiProperty()
  item: Item | null;

  @IsObject()
  @IsOptional()
  @ApiProperty()
  order: Order | null;
}
