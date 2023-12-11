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
import { IdDto, PaginationResponse, SearchDto } from '../../common';
import { RawMaterialResponse } from '../dto';
import { CreateRawMaterialDto } from '../dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from '../dto/update-raw-material.dto';
import { RawMaterialService } from '../services/raw-material.service';

@ApiTags('Raw Materials')
@Controller('raw-materials')
export class RawMaterialController {
  constructor(private readonly rawMaterialService: RawMaterialService) {}

  @Post()
  async create(
    @Body() dto: CreateRawMaterialDto,
  ): Promise<RawMaterialResponse> {
    const result = await this.rawMaterialService.create(dto);
    return new RawMaterialResponse(result);
  }

  @Get()
  async findAll(
    @Query() dto: SearchDto,
  ): Promise<PaginationResponse<RawMaterialResponse>> {
    const { data, count } = await this.rawMaterialService.findMany(dto);
    return new PaginationResponse(
      data.map((rawMaterial) => new RawMaterialResponse(rawMaterial)),
      count,
      dto.page,
      dto.limit,
    );
  }

  @Patch(':id')
  async update(@Param() { id }: IdDto, @Body() dto: UpdateRawMaterialDto) {
    await this.rawMaterialService.update(id, dto);
    return {};
  }

  @Delete(':id')
  async delete(@Param() { id }: IdDto) {
    await this.rawMaterialService.delete(id);
    return {};
  }
}
