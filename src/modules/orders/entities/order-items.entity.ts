import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { OrderItems as IOrderItems } from '../../../shared/prisma/entities';

export class OrderItems implements IOrderItems {
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
  isValid: boolean;
}
