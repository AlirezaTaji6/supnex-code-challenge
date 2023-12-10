import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';
import { IsId } from '../../common';

export class CreateRawMaterialPriceDto {
  @ApiProperty()
  @IsId()
  supplierId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsId()
  rawMaterialId: number;
}
