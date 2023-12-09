import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class IdDto {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  id: number;
}
