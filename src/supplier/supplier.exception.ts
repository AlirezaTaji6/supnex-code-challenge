import { ConflictException } from '@nestjs/common';

export enum SupplierMessages {
  NAME_DUPLICATED = 'supplier.NAME_DUPLICATED',
}

export class SupplierNameDuplicated extends ConflictException {
  constructor() {
    super(SupplierMessages.NAME_DUPLICATED);
  }
}
