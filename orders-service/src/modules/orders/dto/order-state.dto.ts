import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { StateCode } from '../enums/order-state.enum';

export class OrderStateDto {
  @IsEnum(StateCode)
  @ApiProperty({ enum: StateCode })
  code: StateCode;

  @IsString()
  @ApiProperty()
  description: string;
}
