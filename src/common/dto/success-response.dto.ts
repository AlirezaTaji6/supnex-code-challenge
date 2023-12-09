import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse<T> {
  @ApiProperty({ type: Object })
  data: T;

  @ApiProperty({ type: Object })
  metadata: object;

  @ApiProperty({ type: String, required: false })
  message?: string;

  @ApiProperty({ type: Number })
  statusCode: number;

  constructor(
    data: T,
    metadata = null,
    message?: string,
    statusCode = HttpStatus.OK,
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
}
