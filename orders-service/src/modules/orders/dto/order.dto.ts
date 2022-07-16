import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNumber, IsObject } from 'class-validator';
import { StateCode } from '../enums/order-state.enum';
import { OrderItemsDto } from './order-items.dto';
import { UserDto } from './user.dto';

interface OrderEntity extends Omit<OrderDto, 'customer' | 'stateCode'> {
  customer: any;
  stateCode: any;
}

export class OrderDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsObject()
  @ApiProperty()
  customer: UserDto;

  @IsEnum(StateCode)
  @ApiProperty({ enum: StateCode })
  stateCode: StateCode;

  @IsArray()
  @ApiProperty()
  items?: OrderItemsDto[];

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  static fromEntity(data: OrderEntity) {
    const { customer, ...dto } = data;

    const serializedCustomer = typeof customer === 'string' 
      ? JSON.parse(customer.valueOf()) 
      : customer.valueOf();
    
    return Object.assign(new OrderDto(), {
      customer: serializedCustomer,
      ...dto,
    });
  }
}
