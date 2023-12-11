import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RawMaterialMessages } from '../../src/raw-material';
import {
  RawMaterialPriceResponse,
  RawMaterialResponse,
} from '../../src/raw-material/dto';
import { RawMaterialCategoryMessages } from '../../src/raw-material/raw-material-category';
import { RawMaterialPriceRepo } from '../../src/raw-material/repository/raw-material-price.repository';
import { UnitMessages } from '../../src/unit/unit.exception';
import { beforeAllUtil } from '../before-all';
import { TestRepository } from '../repository';
import { rawMaterialCategorySeeder } from '../seeders/raw-material-category-seeder';
import { rawMaterialSeeder } from '../seeders/raw-material-seeder';
import { supplierSeeder } from '../seeders/supplier-seeder';
import { unitSeeder } from '../seeders/unit-seeder';
import { ValidationTester } from '../validation-tester';

describe('Create Raw Material (e2e)', () => {
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
      .post(baseUrl)
      .send({})
      .expect(HttpStatus.BAD_REQUEST);

    new ValidationTester(result.body.errors).isFirstLayer([
      'name',
      'unitId',
      'categoryId',
    ]);
  });

  it('Unit not found', async () => {
    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({ name: 'test-raw-material', unitId: 1, categoryId: 1 })
      .expect(HttpStatus.NOT_FOUND);

    expect(result.body.message).toBe(UnitMessages.NOT_FOUND);
  });

  it('Category not found', async () => {
    const unit = await unitSeeder(repository.repository);

    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({ name: 'test-raw-material', unitId: unit.id, categoryId: 1 })
      .expect(HttpStatus.NOT_FOUND);

    expect(result.body.message).toBe(RawMaterialCategoryMessages.NOT_FOUND);
  });

  it('Name duplicated', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const name = 'test-raw-material';
    await rawMaterialSeeder(repository.repository, {
      name,
      categoryId: category.id,
      unitId: unit.id,
    });
    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({ name, unitId: unit.id, categoryId: category.id })
      .expect(HttpStatus.CONFLICT);

    expect(result.body.message).toBe(RawMaterialMessages.NAME_DUPLICATED);
  });

  it('Price transaction failed', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const supplier = await supplierSeeder(repository.repository);
    const name = 'test-raw-material';
    const price = 1000;

    const rawMaterialPriceRepo = await app.get(RawMaterialPriceRepo);
    const originalMethod = rawMaterialPriceRepo.createTransactional;
    rawMaterialPriceRepo.createTransactional = jest
      .fn()
      .mockRejectedValueOnce('failed');

    await request(app.getHttpServer())
      .post(baseUrl)
      .send({
        name,
        unitId: unit.id,
        categoryId: category.id,
        supplierId: supplier.id,
        price,
      })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    const rawMaterials = await repository.repository.rawMaterial.find({
      where: {},
    });
    expect(rawMaterials.length).toBe(0);
    rawMaterialPriceRepo.createTransactional = originalMethod;
  });

  it('ok', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const name = 'test-raw-material';

    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({ name, unitId: unit.id, categoryId: category.id })
      .expect(HttpStatus.CREATED);

    const rawMaterialFound = await repository.repository.rawMaterial.findOne({
      where: { id: result.body.data.id },
    });

    expect(result.body.data).toMatchObject(
      new RawMaterialResponse(rawMaterialFound),
    );
  });

  it('ok (containing price)', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const supplier = await supplierSeeder(repository.repository);
    const name = 'test-raw-material';
    const price = 1000;

    const result = await request(app.getHttpServer())
      .post(baseUrl)
      .send({
        name,
        unitId: unit.id,
        categoryId: category.id,
        supplierId: supplier.id,
        price,
      })
      .expect(HttpStatus.CREATED);

    const rawMaterialFound = await repository.repository.rawMaterial.findOne({
      where: { id: result.body.data.id },
      relations: ['prices'],
    });

    expect(rawMaterialFound.prices[0]).toMatchObject(
      new RawMaterialPriceResponse({
        id: rawMaterialFound.prices[0].id,
        price,
        rawMaterialId: rawMaterialFound.id,
        supplierId: supplier.id,
      }),
    );
    expect(result.body.data).toMatchObject(
      new RawMaterialResponse(rawMaterialFound),
    );
  });
});
