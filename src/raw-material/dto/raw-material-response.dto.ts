import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UnitResponse } from '../../unit/dto';
import { RawMaterialCategoryResponse } from '../raw-material-category/dto';
import { RawMaterialPriceResponse } from './raw-material-price-response.dto';

export class RawMaterialResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [RawMaterialPriceResponse] })
  prices: RawMaterialPriceResponse[];

  @ApiProperty()
  unitId: number;

  @ApiPropertyOptional({ type: UnitResponse })
  unit?: UnitResponse;

  @ApiProperty()
  categoryId: number;

  @ApiPropertyOptional({ type: RawMaterialCategoryResponse })
  category?: RawMaterialCategoryResponse;

  @ApiProperty()
  stock?: number;

  constructor(init: Partial<RawMaterialResponse>) {
    this.id = init.id;
    this.name = init.name;
    this.prices =
      init.prices && init.prices.length
        ? init.prices.map((price) => new RawMaterialPriceResponse(price))
        : undefined;
    this.unitId = init.unitId;
    this.unit = init.unit ? new UnitResponse(init.unit) : undefined;
    this.categoryId = init.categoryId;
    this.category = init.category
      ? new RawMaterialCategoryResponse(init.category)
      : undefined;
    this.stock = init.stock || 0;
  }
}
