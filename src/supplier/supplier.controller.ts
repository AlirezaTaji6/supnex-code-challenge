import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdDto, PaginationResponse, SearchDto } from '../common';
import { CreateSupplierDto, SupplierResponse, UpdateSupplierDto } from './dto';
import { SuppliersService } from './supplier.service';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SuppliersService) {}

  @Post()
  async create(@Body() dto: CreateSupplierDto): Promise<SupplierResponse> {
    const result = await this.supplierService.create(dto);
    return new SupplierResponse(result);
  }

  @Get()
  async findAll(
    @Query() dto: SearchDto,
  ): Promise<PaginationResponse<SupplierResponse>> {
    const { data, count } = await this.supplierService.findMany(dto);
    return new PaginationResponse(
      data.map((supplier) => new SupplierResponse(supplier)),
      count,
      dto.page,
      dto.limit,
    );
  }

  @Patch(':id')
  async update(@Param() { id }: IdDto, @Body() dto: UpdateSupplierDto) {
    await this.supplierService.update(id, dto);
    return {};
  }

  @Delete(':id')
  async delete(@Param() { id }: IdDto) {
    await this.supplierService.delete(id);
    return {};
  }
}
