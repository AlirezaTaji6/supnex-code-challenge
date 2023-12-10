import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IsId } from '../../common';

export class UpdateRawMaterialDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsId()
  @IsOptional()
  unitId?: number;

  @ApiPropertyOptional()
  @IsId()
  @IsOptional()
  categoryId?: number;
}
