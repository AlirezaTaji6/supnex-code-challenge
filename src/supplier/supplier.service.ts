import { Injectable } from '@nestjs/common';
import { DeleteFailed, IListCount, SearchDto, UpdateFailed } from 'src/common';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';
import { SupplierRepo } from './repository/suppler.repository';
import { Supplier } from './repository/supplier.entity';
import { SupplierNameDuplicated } from './supplier.exception';

@Injectable()
export class SuppliersService {
  constructor(private readonly repo: SupplierRepo) {}

  async findMany(dto: SearchDto): Promise<IListCount<Supplier>> {
    return this.repo.findMany(dto);
  }

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    await this.isDuplicated(dto.name);
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateSupplierDto) {
    await this.isDuplicated(dto.name);
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

  private async isDuplicated(name: string) {
    const Supplier = await this.repo.findByName(name);
    if (Supplier) throw new SupplierNameDuplicated();
  }
}
