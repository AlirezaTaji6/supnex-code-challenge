import { ConflictException, NotFoundException } from '@nestjs/common';

export enum RawMaterialCategoryMessages {
  NOT_FOUND = 'raw-material-category.NOT_FOUND',
  NAME_DUPLICATED = 'raw-material-category.NAME_DUPLICATED',
}

export class RawMaterialCategoryNotFound extends NotFoundException {
  constructor() {
    super(RawMaterialCategoryMessages.NOT_FOUND);
  }
}

export class RawMaterialCategoryNameDuplicated extends ConflictException {
  constructor() {
    super(RawMaterialCategoryMessages.NAME_DUPLICATED);
  }
}
