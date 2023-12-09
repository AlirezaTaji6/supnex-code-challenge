import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SuccessResponse } from './success-response.dto';

class PaginationData {
  @ApiProperty()
  itemsCount: number;

  @ApiPropertyOptional()
  nextPage?: number;

  @ApiPropertyOptional()
  previousPage?: number;

  @ApiProperty({ default: 0 })
  pagesCount: number;

  @ApiProperty()
  pageSize: number;

  constructor(itemsCount: number, page: number, limit: number) {
    const pagesCount = Math.ceil(itemsCount / limit) || 1;
    this.itemsCount = itemsCount;
    this.pageSize = limit;
    this.nextPage = page === pagesCount || itemsCount === 0 ? null : page + 1;
    this.previousPage = page === 1 || itemsCount === 0 ? null : page - 1;
    this.pagesCount = itemsCount === 0 ? 0 : pagesCount;
  }
}

export class PaginationResponse<type> extends SuccessResponse<type[]> {
  @ApiProperty()
  pagination: PaginationData;

  constructor(
    data: type[],
    itemsCount: number,
    currentPage: number,
    limit: number,
    message?: string,
    metadata: object = {},
  ) {
    super(data, metadata, message, HttpStatus.OK);
    this.pagination = new PaginationData(itemsCount, currentPage, limit);
  }
}
