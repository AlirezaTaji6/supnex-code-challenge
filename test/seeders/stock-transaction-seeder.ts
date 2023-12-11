import { StockTransaction } from '../../src/stock-transaction/repository/stock-transaction.entity';
import { ITestRepository } from '../repository';

export function stockTransactionSeeder(
  repository: ITestRepository,
  {
    rawMaterialId,
    supplierId,
    count,
  }: { count: number; rawMaterialId: number; supplierId: number },
): Promise<StockTransaction> {
  return repository.stockTransaction.save(
    repository.stockTransaction.create({
      rawMaterialId,
      supplierId,
      count,
      balance: count,
    }),
  );
}
