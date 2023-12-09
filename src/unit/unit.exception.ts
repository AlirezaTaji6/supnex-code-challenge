import { ConflictException } from '@nestjs/common';

export enum UnitMessages {
  NAME_DUPLICATED = 'unit.NAME_DUPLICATED',
  SYMBOL_DUPLICATED = 'unit.SYMBOL_DUPLICATED',
}

export class UnitNameDuplicated extends ConflictException {
  constructor() {
    super(UnitMessages.NAME_DUPLICATED);
  }
}

export class UnitSymbolDuplicated extends ConflictException {
  constructor() {
    super(UnitMessages.SYMBOL_DUPLICATED);
  }
}
