import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IListCount, SearchDto, typeormPagination } from '../../common';
import { RawMaterial } from './raw-material.entity';

@Injectable()
export class RawMaterialRepo extends Repository<RawMaterial> {
  constructor(
    @InjectRepository(RawMaterial)
    repo: Repository<RawMaterial>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findMany(input: SearchDto): Promise<IListCount<RawMaterial>> {
    const { data, count } = await typeormPagination(
      input,
      this.createQueryBuilder('raw_material')
        .leftJoinAndSelect('raw_material.prices', 'prices')
        .leftJoinAndSelect('prices.supplier', 'supplier')
        .leftJoinAndSelect('raw_material.category', 'category'),
      {
        search: ['raw_material.name'],
        sortableColumns: [
          'raw_material.id',
          'raw_material.createdAt',
          'raw_material.updatedAt',
        ],
      },
    );
    return { data, count };
  }

  findByNameAndCategoryId({
    name,
    categoryId,
  }: {
    name: string;
    categoryId: number;
  }): Promise<RawMaterial | null> {
    return this.findOne({ where: { name, categoryId } });
  }

  findById(id: number): Promise<RawMaterial | null> {
    return this.findOne({ where: { id } });
  }

  createTransactional(
    {
      name,
      unitId,
      categoryId,
    }: { name: string; unitId: number; categoryId: number },
    transactionManager: EntityManager,
  ) {
    return transactionManager.save(
      transactionManager.create(RawMaterial, { name, unitId, categoryId }),
    );
  }
}
