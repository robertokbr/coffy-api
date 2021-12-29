import { IsObject, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItems } from '../../../shared/prisma/entities';
import { JsonObject } from 'src/shared/types';

export class CreateOrderDto {
  @IsObject()
  @ApiProperty()
  customer: JsonObject;

  @IsArray()
  @ApiProperty()
  items: OrderItems[];
}
