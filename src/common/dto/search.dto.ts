import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { IsSort } from '../decorators/is-sort.decorator';
import { PaginationDto } from './pagination.dto';

export class SearchDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search = '';

  @ApiPropertyOptional({ default: `["id:DESC"]` })
  @Transform((o) => {
    try {
      return JSON.parse(o.value);
    } catch (err) {
      return o.value;
    }
  })
  @IsString({ each: true })
  @IsSort({ each: true })
  @IsOptional()
  sorts?: string[];
}
