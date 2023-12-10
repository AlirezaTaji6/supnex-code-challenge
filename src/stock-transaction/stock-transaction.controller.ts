import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChangeStockDto, StockTransactionResponse } from './dto';
import { StockTransactionService } from './stock-transaction.service';

@ApiTags('Stock Transactions')
@Controller('stock-transactions')
export class StockTransactionController {
  constructor(
    private readonly stockTransactionService: StockTransactionService,
  ) {}

  @Post()
  async changeStock(
    @Body() dto: ChangeStockDto,
  ): Promise<StockTransactionResponse> {
    const result = await this.stockTransactionService.change(dto);
    return new StockTransactionResponse(result);
  }
}
