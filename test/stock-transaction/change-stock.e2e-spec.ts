import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RawMaterialMessages } from '../../src/raw-material';
import { StockTransactionMessages } from '../../src/stock-transaction';
import { SupplierMessages } from '../../src/supplier';
import { beforeAllUtil } from '../before-all';
import { TestRepository } from '../repository';
import { rawMaterialCategorySeeder } from '../seeders/raw-material-category-seeder';
import { rawMaterialSeeder } from '../seeders/raw-material-seeder';
import { stockTransactionSeeder } from '../seeders/stock-transaction-seeder';
import { supplierSeeder } from '../seeders/supplier-seeder';
import { unitSeeder } from '../seeders/unit-seeder';
import { ValidationTester } from '../validation-tester';

describe('Change Stock (e2e)', () => {
  let app: INestApplication;
  const baseUrl = '/api/stock-transactions';
  let repository: TestRepository;
  beforeAll(async () => {
    const result = await beforeAllUtil();
    app = result.app;

    const moduleFixture = result.moduleFixture;
    repository = new TestRepository(moduleFixture);
  });

  beforeEach(async () => {
    await repository.clean();
  });
  afterEach(async () => {
    await repository.clean();
  });

  it('Validation failed', async () => {
    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({})
      .expect(HttpStatus.BAD_REQUEST);

    new ValidationTester(result.body.errors).isFirstLayer([
      'rawMaterialId',
      'supplierId',
      'count',
    ]);
  });

  it('Validation failed', async () => {
    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({})
      .expect(HttpStatus.BAD_REQUEST);

    new ValidationTester(result.body.errors).isFirstLayer([
      'rawMaterialId',
      'supplierId',
      'count',
    ]);
  });

  it('Count cannot be zero', async () => {
    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({ rawMaterialId: 1, supplierId: 1, count: 0 })
      .expect(HttpStatus.BAD_REQUEST);

    new ValidationTester(result.body.errors).isFirstLayer(['count']);
  });

  it('Supplier not found', async () => {
    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({ rawMaterialId: 1, supplierId: 1, count: 1 })
      .expect(HttpStatus.NOT_FOUND);

    expect(result.body.message).toBe(SupplierMessages.NOT_FOUND);
  });

  it('Raw material not found', async () => {
    const supplier = await supplierSeeder(repository.repository);
    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({ rawMaterialId: 1, supplierId: supplier.id, count: 1 })
      .expect(HttpStatus.NOT_FOUND);

    expect(result.body.message).toBe(RawMaterialMessages.NOT_FOUND);
  });

  it('Balance cannot be negative', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const rawMaterial = await rawMaterialSeeder(repository.repository, {
      name: 'test-raw-material',
      unitId: unit.id,
      categoryId: category.id,
    });
    const supplier = await supplierSeeder(repository.repository);

    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({
        rawMaterialId: rawMaterial.id,
        supplierId: supplier.id,
        count: -1,
      })
      .expect(HttpStatus.NOT_ACCEPTABLE);

    expect(result.body.message).toBe(
      StockTransactionMessages.BALANCE_CANNOT_BE_NEGATIVE,
    );
  });

  it('ok', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const rawMaterial = await rawMaterialSeeder(repository.repository, {
      name: 'test-raw-material',
      unitId: unit.id,
      categoryId: category.id,
    });
    const supplier = await supplierSeeder(repository.repository);

    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({
        rawMaterialId: rawMaterial.id,
        supplierId: supplier.id,
        count: 1,
      })
      .expect(HttpStatus.CREATED);

    const stockTransaction =
      await repository.repository.stockTransaction.findOne({
        where: { rawMaterialId: rawMaterial.id, supplierId: supplier.id },
      });
    expect(stockTransaction.count).toBe(1);
    expect(stockTransaction.balance).toBe(1);
  });

  it('ok (with older transaction)', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const rawMaterial = await rawMaterialSeeder(repository.repository, {
      name: 'test-raw-material',
      unitId: unit.id,
      categoryId: category.id,
    });
    const supplier = await supplierSeeder(repository.repository);

    const lastTransaction = await stockTransactionSeeder(
      repository.repository,
      {
        rawMaterialId: rawMaterial.id,
        supplierId: supplier.id,
        count: 5,
      },
    );

    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({
        rawMaterialId: rawMaterial.id,
        supplierId: supplier.id,
        count: 1,
      })
      .expect(HttpStatus.CREATED);

    const stockTransaction =
      await repository.repository.stockTransaction.findOne({
        where: { id: result.body.data.id },
      });
    expect(stockTransaction.rawMaterialId).toBe(rawMaterial.id);
    expect(stockTransaction.supplierId).toBe(supplier.id);
    expect(stockTransaction.count).toBe(1);
    expect(stockTransaction.balance).toBe(
      lastTransaction.balance + result.body.data.count,
    );
  });
});
