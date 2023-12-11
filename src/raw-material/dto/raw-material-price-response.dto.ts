import { ApiProperty } from '@nestjs/swagger';
import { SupplierResponse } from '../../supplier/dto';

export class RawMaterialPriceResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  rawMaterialId: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  supplierId: number;

  @ApiProperty({ type: SupplierResponse })
  supplier?: SupplierResponse;

  constructor(init: Partial<RawMaterialPriceResponse>) {
    this.id = init.id;
    this.rawMaterialId = init.rawMaterialId;
    this.price = init.price;
    this.supplierId = init.supplierId;
    if (init.supplier) {
      this.supplier = new SupplierResponse(init.supplier);
    }
  }
}
