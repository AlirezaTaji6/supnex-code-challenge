import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawMaterialCategory } from '../src/raw-material/raw-material-category/repository/raw-material-category.entity';
import { RawMaterialPrice } from '../src/raw-material/repository/raw-material-price.entity';
import { RawMaterial } from '../src/raw-material/repository/raw-material.entity';
import { StockTransaction } from '../src/stock-transaction/repository/stock-transaction.entity';
import { Supplier } from '../src/supplier/repository/supplier.entity';
import { Unit } from '../src/unit/repository/unit.entity';

export interface ITestRepository {
  unit: Repository<Unit>;
  rawMaterial: Repository<RawMaterial>;
  rawMaterialCategory: Repository<RawMaterialCategory>;
  supplier: Repository<Supplier>;
  stockTransaction: Repository<StockTransaction>;
  rawMaterialPrice: Repository<RawMaterialPrice>;
}

export class TestRepository {
  public readonly repository: ITestRepository;

  constructor(moduleFixture: TestingModule) {
    this.repository = {
      unit: moduleFixture.get(getRepositoryToken(Unit)),
      supplier: moduleFixture.get(getRepositoryToken(Supplier)),
      rawMaterialCategory: moduleFixture.get(
        getRepositoryToken(RawMaterialCategory),
      ),
      rawMaterial: moduleFixture.get(getRepositoryToken(RawMaterial)),
      rawMaterialPrice: moduleFixture.get(getRepositoryToken(RawMaterialPrice)),
      stockTransaction: moduleFixture.get(getRepositoryToken(StockTransaction)),
    };
  }

  async clean() {
    for await (const entity of Object.keys(this.repository).reverse()) {
      await this.repository[entity].delete({});
    }
  }
}
