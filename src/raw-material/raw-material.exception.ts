import { ConflictException, NotFoundException } from '@nestjs/common';

export enum RawMaterialMessages {
  NAME_DUPLICATED = 'raw-material.NAME_DUPLICATED',
  NOT_FOUND = 'raw-material.NOT_FOUND',
  PRICE_DUPLICATED = 'raw-material.PRICE_DUPLICATED',
}

export class RawMaterialNameDuplicated extends ConflictException {
  constructor() {
    super(RawMaterialMessages.NAME_DUPLICATED);
  }
}

export class RawMaterialNotFound extends NotFoundException {
  constructor() {
    super(RawMaterialMessages.NOT_FOUND);
  }
}

export class RawMaterialPriceDuplicated extends ConflictException {
  constructor() {
    super(RawMaterialMessages.PRICE_DUPLICATED);
  }
}
