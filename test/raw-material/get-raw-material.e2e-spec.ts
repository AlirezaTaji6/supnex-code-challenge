import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { beforeAllUtil } from '../before-all';
import { TestRepository } from '../repository';
import { rawMaterialCategorySeeder } from '../seeders/raw-material-category-seeder';
import { rawMaterialSeeder } from '../seeders/raw-material-seeder';
import { supplierSeeder } from '../seeders/supplier-seeder';
import { unitSeeder } from '../seeders/unit-seeder';
import { ValidationTester } from '../validation-tester';

describe('Get Raw Materials (e2e)', () => {
  let app: INestApplication;
  const baseUrl = '/api/raw-materials';
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
      .get(baseUrl)
      .send({})
      .expect(HttpStatus.BAD_REQUEST);
    new ValidationTester(result.body.errors).isFirstLayer(['page', 'limit']);
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
    const supplier2 = await supplierSeeder(repository.repository, {
      name: 'supplier2',
    });

    await request(app.getHttpServer()).post('/api/stock-transactions').send({
      rawMaterialId: rawMaterial.id,
      supplierId: supplier.id,
      count: 5,
    });

    await request(app.getHttpServer()).post('/api/stock-transactions').send({
      rawMaterialId: rawMaterial.id,
      supplierId: supplier.id,
      count: 7,
    });
    await request(app.getHttpServer()).post('/api/stock-transactions').send({
      rawMaterialId: rawMaterial.id,
      supplierId: supplier2.id,
      count: 7,
    });

    const result = await request(app.getHttpServer())
      .get(`${baseUrl}?page=1&limit=20`)
      .send({})
      .expect(HttpStatus.OK);
    expect(result.body.data[0].stock).toBe(5 + 7 + 7);
  });
});
