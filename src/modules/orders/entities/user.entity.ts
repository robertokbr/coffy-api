import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class User {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;
}
