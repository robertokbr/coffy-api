import { JsonObject } from 'src/shared/types';
import { StateCode } from '../enums/order-state.enum';
import {
  IsNumber,
  IsObject,
  IsEnum,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOrdersDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  id?: number;

  @IsObject()
  @IsOptional()
  @ApiProperty({ required: false })
  customer?: JsonObject;

  @IsEnum(StateCode)
  @IsOptional()
  @ApiProperty({ required: false })
  code?: StateCode;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  createdAt?: Date;
}
