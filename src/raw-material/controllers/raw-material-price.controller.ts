import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from '../../common';
import {
  CreateRawMaterialPriceDto,
  RawMaterialPriceResponse,
  UpdateRawMaterialPriceDto,
} from '../dto';
import { RawMaterialPriceService } from '../services/raw-material-price.service';

@ApiTags('Raw Material Prices')
@Controller('raw-material/prices')
export class RawMaterialPriceController {
  constructor(
    private readonly rawMaterialPriceService: RawMaterialPriceService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateRawMaterialPriceDto,
  ): Promise<RawMaterialPriceResponse> {
    const result = await this.rawMaterialPriceService.create(dto);
    return new RawMaterialPriceResponse(result);
  }

  @Patch(':id')
  async update(@Param() { id }: IdDto, @Body() dto: UpdateRawMaterialPriceDto) {
    await this.rawMaterialPriceService.update(id, dto);
    return {};
  }

  @Delete(':id')
  async delete(@Param() { id }: IdDto) {
    await this.rawMaterialPriceService.delete(id);
    return {};
  }
}
