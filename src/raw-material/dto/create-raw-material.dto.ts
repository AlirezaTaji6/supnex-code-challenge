import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { IsId } from '../../common';

export class CreateRawMaterialDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Type(() => Number)
  @IsId()
  unitId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsId()
  categoryId: number;

  @ApiPropertyOptional()
  @IsId()
  @IsOptional()
  supplierId?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  price?: number;
}
