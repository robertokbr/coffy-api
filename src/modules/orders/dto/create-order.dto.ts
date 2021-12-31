import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsObject } from 'class-validator';
import { StateCode } from '../enums/order-state.enum';

export class CreateOrderDto {
  @IsEnum(StateCode)
  @ApiProperty()
  code: StateCode;

  @IsObject()
  @ApiProperty()
  customer: Record<string, any>;

  @IsArray()
  @ApiProperty()
  items: Array<{
    id: number;
    amount: number;
  }>;
}
