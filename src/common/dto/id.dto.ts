import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { IsId } from '../decorators/is-id.decorator';

export class IdDto {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsId()
  id: number;
}
