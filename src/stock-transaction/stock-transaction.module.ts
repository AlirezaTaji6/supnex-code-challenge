import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialModule } from '../raw-material';
import { SupplierModule } from '../supplier';
import { StockTransaction } from './entities/stock-transaction.entity';
import { StockTransactionRepo } from './entities/stock-transaction.repository';
import { StockTransactionController } from './stock-transaction.controller';
import { StockTransactionService } from './stock-transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockTransaction]),
    SupplierModule,
    RawMaterialModule,
  ],
  controllers: [StockTransactionController],
  providers: [StockTransactionService, StockTransactionRepo],
  exports: [StockTransactionService],
})
export class StockTransactionModule {}
