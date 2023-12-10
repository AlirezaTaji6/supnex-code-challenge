import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IListCount, SearchDto, typeormPagination } from 'src/common';
import { Repository } from 'typeorm';
import { RawMaterialCategory } from './raw-material-category.entity';

@Injectable()
export class RawMaterialCategoryRepo extends Repository<RawMaterialCategory> {
  constructor(
    @InjectRepository(RawMaterialCategory)
    repo: Repository<RawMaterialCategory>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findMany(input: SearchDto): Promise<IListCount<RawMaterialCategory>> {
    const { data, count } = await typeormPagination(input, this, {
      search: ['name'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
    });
    return { data, count };
  }

  findByName(name: string): Promise<RawMaterialCategory | null> {
    return this.findOne({ where: { name } });
  }

  findById(id: number): Promise<RawMaterialCategory | null> {
    return this.findOne({ where: { id } });
  }
}
