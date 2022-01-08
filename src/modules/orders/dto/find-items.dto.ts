import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindItemsDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => typeof value === 'string' && JSON.parse(value))
  isAvailable: boolean;
}
