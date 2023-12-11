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

    if (init.prices && init.prices.length) {
      this.prices = init.prices.map(
        (price) => new RawMaterialPriceResponse(price),
      );
    }

    this.unitId = init.unitId;
    if (init.unit) {
      this.unit = new UnitResponse(init.unit);
    }

    this.categoryId = init.categoryId;
    if (init.category) {
      this.category = new RawMaterialCategoryResponse(init.category);
    }

    this.stock = init.stock || 0;
  }
}
