import { Injectable } from '@nestjs/common';
import { StockTransactionBridgeRepo } from './stock-transaction-bridge.repository';

@Injectable()
export class StockTransactionBridgeService {
  constructor(private readonly repo: StockTransactionBridgeRepo) {}

  async getBalanceByRawMaterialId(rawMaterialId: number): Promise<number> {
    const result = await this.repo.getBalanceByRawMaterialId(rawMaterialId);
    return result.reduce(
      (accumulator, currentValue) => accumulator + currentValue.balance,
      0,
    );
  }
}
