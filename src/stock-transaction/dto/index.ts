import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotIn } from 'class-validator';
import { IsId } from '../../common';
import { RawMaterialResponse } from '../../raw-material/dto';
import { SupplierResponse } from '../../supplier/dto';

export class ChangeStockDto {
  @ApiProperty()
  @IsId()
  rawMaterialId: number;

  @ApiProperty()
  @IsInt()
  @IsNotIn([0])
  count: number;

  @ApiProperty()
  @IsId()
  supplierId: number;
}

export class StockTransactionResponse {
  @ApiProperty()
  rawMaterialId: number;

  @ApiPropertyOptional({ type: RawMaterialResponse })
  rawMaterial?: RawMaterialResponse;

  @ApiProperty()
  supplierId: number;

  @ApiPropertyOptional({ type: SupplierResponse })
  supplier?: SupplierResponse;

  @ApiProperty()
  count: number;

  @ApiProperty()
  balance: number;

  constructor(init: Partial<StockTransactionResponse>) {
    this.rawMaterial = init.rawMaterial
      ? new RawMaterialResponse(init.rawMaterial)
      : undefined;
    this.rawMaterialId = init.rawMaterialId;
    this.supplier = init.supplier
      ? new SupplierResponse(init.supplier)
      : undefined;
    this.supplierId = init.supplierId;
    this.count = init.count;
    this.balance = init.balance;
  }
}
