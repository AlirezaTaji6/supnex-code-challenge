import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  DeleteFailed,
  IListCount,
  SearchDto,
  TypeormTransactionTemplate,
  UpdateFailed,
} from '../../common';
import { StockTransactionBridgeService } from '../../stock-transaction/bridge';
import { UnitsService } from '../../unit';
import { CreateRawMaterialDto } from '../dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from '../dto/update-raw-material.dto';
import { RawMaterialCategoryService } from '../raw-material-category';
import {
  RawMaterialNameDuplicated,
  RawMaterialNotFound,
} from '../raw-material.exception';
import { RawMaterialPriceRepo } from '../repository/raw-material-price.repository';
import { RawMaterial } from '../repository/raw-material.entity';
import { RawMaterialRepo } from '../repository/raw-material.repository';

@Injectable()
export class RawMaterialService {
  constructor(
    private readonly repo: RawMaterialRepo,
    private readonly rawMaterialPriceRepo: RawMaterialPriceRepo,
    private readonly unitsSerivce: UnitsService,
    private readonly categoryService: RawMaterialCategoryService,
    private readonly stockTransactionService: StockTransactionBridgeService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create({
    name,
    unitId,
    supplierId,
    price,
    categoryId,
  }: CreateRawMaterialDto): Promise<RawMaterial> {
    await this.unitsSerivce.isExistsById(unitId);
    await this.categoryService.findOne(categoryId);
    await this.isDuplicated({ name, categoryId });
    if (supplierId && price) {
      const transactionTemplate = new TypeormTransactionTemplate<RawMaterial>(
        this.dataSource,
      );
      transactionTemplate.handler = async (manager) => {
        const rawMaterial = await this.repo.createTransactional(
          { name, unitId, categoryId },
          manager,
        );
        const rawMaterialPrice =
          await this.rawMaterialPriceRepo.createTransactional(
            {
              supplierId,
              price,
              rawMaterialId: rawMaterial.id,
            },
            manager,
          );
        rawMaterial.prices = [rawMaterialPrice];
        return rawMaterial;
      };
      return transactionTemplate.apply();
    } else {
      return this.repo.save(this.repo.create({ name, unitId, categoryId }));
    }
  }

  async isDuplicated({
    name,
    categoryId,
  }: {
    name: string;
    categoryId: number;
  }) {
    const exists = await this.repo.findByNameAndCategoryId({
      name,
      categoryId,
    });
    if (exists) throw new RawMaterialNameDuplicated();
  }

  async findMany(
    dto: SearchDto,
  ): Promise<IListCount<RawMaterial & { stock: number }>> {
    const { data, count } = await this.repo.findMany(dto);
    const list = [];
    for await (const rawMaterial of data) {
      const stock =
        await this.stockTransactionService.getBalanceByRawMaterialId(
          rawMaterial.id,
        );
      list.push({ ...rawMaterial, stock });
    }
    return { data: list, count };
  }

  async findOne(id: number): Promise<RawMaterial> {
    const rawMaterial = await this.repo.findById(id);
    if (!rawMaterial) throw new RawMaterialNotFound();
    return rawMaterial;
  }

  async update(id: number, dto: UpdateRawMaterialDto) {
    const rawMaterial = await this.findOne(id);

    if (dto.unitId) {
      await this.unitsSerivce.isExistsById(dto.unitId);
    }
    if (dto.categoryId) {
      await this.categoryService.findOne(dto.categoryId);
    }
    if (dto.name || dto.categoryId) {
      await this.isDuplicated({
        name: dto.name || rawMaterial.name,
        categoryId: dto.categoryId || rawMaterial.categoryId,
      });
    }
    const { affected } = await this.repo.update(id, dto);
    if (!affected) throw new UpdateFailed();
  }

  async delete(id: number) {
    const { affected } = await this.repo.softDelete(id);
    if (!affected) throw new DeleteFailed();
  }
}
