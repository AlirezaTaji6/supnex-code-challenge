import { ConflictException, NotFoundException } from '@nestjs/common';

export enum SupplierMessages {
  NOT_FOUND = 'supplier.NOT_FOUND',
  NAME_DUPLICATED = 'supplier.NAME_DUPLICATED',
}

export class SupplierNameDuplicated extends ConflictException {
  constructor() {
    super(SupplierMessages.NAME_DUPLICATED);
  }
}

export class SupplierNotFound extends NotFoundException {
  constructor() {
    super(SupplierMessages.NOT_FOUND);
  }
}
