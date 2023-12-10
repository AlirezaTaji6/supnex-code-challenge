import { Injectable } from '@nestjs/common';
import { DeleteFailed, UpdateFailed } from 'src/common';
import { CreateUnitDto, UpdateUnitDto } from './dto';
import { Unit } from './repository/unit.entity';
import { UnitRepo } from './repository/unit.repository';
import {
  UnitNameDuplicated,
  UnitNotFound,
  UnitSymbolDuplicated,
} from './unit.exception';

@Injectable()
export class UnitsService {
  constructor(private readonly repo: UnitRepo) {}

  async findAll(): Promise<Unit[]> {
    return await this.repo.find();
  }

  async create(dto: CreateUnitDto): Promise<Unit> {
    await this.isDuplicated(dto);
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateUnitDto) {
    await this.isDuplicated(dto);
    const result = await this.repo.update(id, dto);
    if (!result.affected) {
      throw new UpdateFailed();
    }
  }

  async delete(id: number) {
    const result = await this.repo.softDelete(id);
    if (!result.affected) {
      throw new DeleteFailed();
    }
  }

  private async isDuplicated({
    name,
    symbol,
  }: {
    name?: string;
    symbol?: string;
  }) {
    if (name) {
      const unit = await this.repo.findByName(name);
      if (unit) throw new UnitNameDuplicated();
    }

    if (symbol) {
      const unit = await this.repo.findBySymbol(symbol);
      if (unit) throw new UnitSymbolDuplicated();
    }
  }

  async isExistsById(id: number) {
    const exists = await this.repo.isExistsById(id);
    if (!exists) throw new UnitNotFound();
  }
}
