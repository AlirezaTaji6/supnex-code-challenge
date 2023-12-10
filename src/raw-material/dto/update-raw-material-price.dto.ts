import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateRawMaterialPriceDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  price: number;
}
