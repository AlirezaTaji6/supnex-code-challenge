import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @Max(20)
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 15, required: true })
  @Type(() => Number)
  limit: number;
}
