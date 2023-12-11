import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockTransaction } from '../repository/stock-transaction.entity';

@Injectable()
export class StockTransactionBridgeRepo extends Repository<StockTransaction> {
  constructor(
    @InjectRepository(StockTransaction)
    repo: Repository<StockTransaction>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  getBalanceByRawMaterialId(
    rawMaterialId: number,
  ): Promise<{ balance: number; supplierId: number }[]> {
    return this.createQueryBuilder('stock_transactions')
      .where('stock_transactions.rawMaterialId = :rawMaterialId', {
        rawMaterialId,
      })
      .select('stock_transactions.balance', 'balance')
      .addSelect('stock_transactions.supplierId', 'supplierId')
      .distinctOn(['stock_transactions.supplierId'])
      .orderBy('stock_transactions.supplierId', 'DESC')
      .addOrderBy('stock_transactions.createdAt', 'DESC')
      .getRawMany();
  }
}
