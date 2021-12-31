import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNumber()
  @ApiProperty()
  id: number;
}
