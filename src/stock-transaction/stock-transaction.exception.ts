import { NotAcceptableException } from '@nestjs/common';

export enum StockTransactionMessages {
  BALANCE_CANNOT_BE_NEGATIVE = 'stock-transaction.BALANCE_CANNOT_BE_NEGATIVE',
}

export class StockBalanceCannotBeNegative extends NotAcceptableException {
  constructor() {
    super(StockTransactionMessages.BALANCE_CANNOT_BE_NEGATIVE);
  }
}
