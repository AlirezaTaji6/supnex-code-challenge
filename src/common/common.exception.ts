import {
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';

export enum CommonErrors {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DELETE_FAILED = 'DELETE_FAILED',
  UPDATE_FAILED = 'UPDATE_FAILED',
}

export class UpdateFailed extends ServiceUnavailableException {
  constructor() {
    super(CommonErrors.UPDATE_FAILED);
  }
}

export class DeleteFailed extends ServiceUnavailableException {
  constructor() {
    super(CommonErrors.DELETE_FAILED);
  }
}

export class InternalServerError extends InternalServerErrorException {
  constructor() {
    super(CommonErrors.INTERNAL_SERVER_ERROR);
  }
}
