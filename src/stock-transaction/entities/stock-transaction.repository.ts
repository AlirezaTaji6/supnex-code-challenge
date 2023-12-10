import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeStockDto } from '../dto';
import { StockTransaction } from './stock-transaction.entity';

@Injectable()
export class StockTransactionRepo extends Repository<StockTransaction> {
  constructor(
    @InjectRepository(StockTransaction)
    repo: Repository<StockTransaction>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  findLastTransaction({
    supplierId,
    rawMaterialId,
  }: Pick<
    ChangeStockDto,
    'supplierId' | 'rawMaterialId'
  >): Promise<StockTransaction | null> {
    return this.findOne({
      where: { supplierId, rawMaterialId },
      order: { createdAt: 'DESC' },
    });
  }
}
