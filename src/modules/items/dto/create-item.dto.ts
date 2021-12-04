import { IsString, IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  orderId: number;
}
