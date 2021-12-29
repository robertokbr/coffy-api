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

export default class FindOrdersDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  id?: number;

  @IsObject()
  @IsOptional()
  @ApiProperty()
  customer?: JsonObject;

  @IsEnum(StateCode)
  @IsOptional()
  @ApiProperty()
  code?: StateCode;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  createdAt?: Date;
}
