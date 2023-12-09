import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from '../common';
import { CreateUnitDto, UnitResponse, UpdateUnitDto } from './dto';
import { UnitsService } from './unit.service';

@ApiTags('Units')
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitsService) {}

  @Post()
  async create(@Body() dto: CreateUnitDto): Promise<UnitResponse> {
    const result = await this.unitService.create(dto);
    return new UnitResponse(result);
  }

  @Get()
  async findAll(): Promise<UnitResponse[]> {
    const units = await this.unitService.findAll();
    return units.map((unit) => new UnitResponse(unit));
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() dto: UpdateUnitDto) {
    return this.unitService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param() { id }: IdDto) {
    return this.unitService.delete(id);
  }
}
