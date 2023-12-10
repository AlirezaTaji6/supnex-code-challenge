import { ConflictException, NotFoundException } from '@nestjs/common';

export enum UnitMessages {
  NAME_DUPLICATED = 'unit.NAME_DUPLICATED',
  SYMBOL_DUPLICATED = 'unit.SYMBOL_DUPLICATED',
  NOT_FOUND = 'unit.NOT_FOUND',
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

export class UnitNotFound extends NotFoundException {
  constructor() {
    super(UnitMessages.NOT_FOUND);
  }
}
