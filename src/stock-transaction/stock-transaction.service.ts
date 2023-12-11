import { Injectable } from '@nestjs/common';
import { RawMaterialService } from '../raw-material';
import { SuppliersService } from '../supplier';
import { ChangeStockDto } from './dto';
import { StockTransaction } from './repository/stock-transaction.entity';
import { StockTransactionRepo } from './repository/stock-transaction.repository';
import { StockBalanceCannotBeNegative } from './stock-transaction.exception';

@Injectable()
export class StockTransactionService {
  constructor(
    private readonly repo: StockTransactionRepo,
    private readonly supplierService: SuppliersService,
    private readonly rawMaterialService: RawMaterialService,
  ) {}
  async create(input: {
    supplierId: number;
    rawMaterialId: number;
    count: number;
    balance: number;
  }): Promise<StockTransaction> {
    await this.supplierService.findOne(input.supplierId);
    await this.rawMaterialService.findOne(input.rawMaterialId);
    return this.repo.save(this.repo.create(input));
  }

  async change(dto: ChangeStockDto) {
    const stockTransaction = await this.repo.findLastTransaction(dto);
    if (!stockTransaction) {
      if (dto.count < 0) throw new StockBalanceCannotBeNegative();
      return this.create({ ...dto, balance: dto.count });
    }

    const balance = stockTransaction.balance + dto.count;
    if (balance < 0) throw new StockBalanceCannotBeNegative();

    return this.create({ ...dto, balance });
  }
}
