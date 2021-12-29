import {
  IsNumber,
  IsString,
  IsDate,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';

export default class Items {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  imageURL: string;

  @IsBoolean()
  @ApiProperty()
  isAvaliable = true;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;

  @IsArray()
  @ApiProperty({
    example: Order.toString(),
  })
  orders: Order[];
}
