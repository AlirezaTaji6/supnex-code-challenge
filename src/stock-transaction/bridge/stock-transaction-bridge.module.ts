import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTransaction } from '../repository/stock-transaction.entity';
import { StockTransactionBridgeRepo } from './stock-transaction-bridge.repository';
import { StockTransactionBridgeService } from './stock-transaction-bridge.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockTransaction])],
  providers: [StockTransactionBridgeService, StockTransactionBridgeRepo],
  exports: [StockTransactionBridgeService],
})
export class StockTransactionBridgeModule {}
