import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IListCount, SearchDto, typeormPagination } from '../../common';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierRepo extends Repository<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    repo: Repository<Supplier>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  findMany(dto: SearchDto): Promise<IListCount<Supplier>> {
    return typeormPagination(dto, this, {
      search: ['name'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
    });
  }

  async findByName(name: string): Promise<Supplier> {
    return this.findOne({ where: { name } });
  }
}
