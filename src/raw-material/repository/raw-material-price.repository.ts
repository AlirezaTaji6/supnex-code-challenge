import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateRawMaterialPriceDto } from '../dto';
import { RawMaterialPrice } from './raw-material-price.entity';

@Injectable()
export class RawMaterialPriceRepo extends Repository<RawMaterialPrice> {
  constructor(
    @InjectRepository(RawMaterialPrice)
    repo: Repository<RawMaterialPrice>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  createTransactional(
    { supplierId, price, rawMaterialId }: CreateRawMaterialPriceDto,
    transactionManager: EntityManager,
  ): Promise<RawMaterialPrice> {
    return transactionManager.save(
      transactionManager.create(RawMaterialPrice, {
        supplierId,
        price,
        rawMaterialId,
      }),
    );
  }

  findByParticipations({
    supplierId,
    rawMaterialId,
  }: {
    supplierId: number;
    rawMaterialId: number;
  }): Promise<RawMaterialPrice | null> {
    return this.findOne({ where: { rawMaterialId, supplierId } });
  }
}
