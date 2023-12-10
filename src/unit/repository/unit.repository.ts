import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';

@Injectable()
export class UnitRepo extends Repository<Unit> {
  constructor(
    @InjectRepository(Unit)
    repo: Repository<Unit>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findByName(name: string): Promise<Unit> {
    return this.findOne({ where: { name } });
  }

  async findBySymbol(symbol: string) {
    return this.findOne({ where: { symbol } });
  }

  async isExistsById(id: number): Promise<boolean> {
    const unit = await this.findOne({ where: { id } });
    return Boolean(unit);
  }
}
