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
import {
  CreateRawMaterialCategoryDto,
  RawMaterialCategoryResponse,
  UpdateRawMaterialCategoryDto,
} from './dto';
import { RawMaterialCategoryService } from './raw-material-category.service';

@ApiTags('Raw Material Categories')
@Controller('raw-material/categories')
export class RawMaterialCategoryController {
  constructor(
    private readonly rawMaterialCategoryService: RawMaterialCategoryService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateRawMaterialCategoryDto,
  ): Promise<RawMaterialCategoryResponse> {
    const result = await this.rawMaterialCategoryService.create(dto);
    return new RawMaterialCategoryResponse(result);
  }

  @Get()
  async findAll(
    @Query() dto: SearchDto,
  ): Promise<PaginationResponse<RawMaterialCategoryResponse>> {
    const { data, count } = await this.rawMaterialCategoryService.findAll(dto);
    return new PaginationResponse(
      data.map((category) => new RawMaterialCategoryResponse(category)),
      count,
      dto.page,
      dto.limit,
    );
  }

  @Get(':id')
  async findOne(@Param() { id }: IdDto): Promise<RawMaterialCategoryResponse> {
    const result = await this.rawMaterialCategoryService.findOne(+id);
    return new RawMaterialCategoryResponse(result);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() dto: UpdateRawMaterialCategoryDto) {
    return this.rawMaterialCategoryService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param() { id }: IdDto) {
    return this.rawMaterialCategoryService.delete(id);
  }
}
