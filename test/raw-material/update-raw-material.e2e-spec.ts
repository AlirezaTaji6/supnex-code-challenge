import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RawMaterialMessages } from '../../src/raw-material';
import { RawMaterialCategoryMessages } from '../../src/raw-material/raw-material-category';
import { UnitMessages } from '../../src/unit/unit.exception';
import { beforeAllUtil } from '../before-all';
import { TestRepository } from '../repository';
import { rawMaterialCategorySeeder } from '../seeders/raw-material-category-seeder';
import { rawMaterialSeeder } from '../seeders/raw-material-seeder';
import { unitSeeder } from '../seeders/unit-seeder';
import { ValidationTester } from '../validation-tester';

describe('Update Raw Material (e2e)', () => {
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
      .patch(`${baseUrl}/a`)
      .send({})
      .expect(HttpStatus.BAD_REQUEST);

    new ValidationTester(result.body.errors).isFirstLayer(['id']);
  });

  it('Unit not found', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const rawMaterial = await rawMaterialSeeder(repository.repository, {
      unitId: unit.id,
      categoryId: category.id,
      name: 'test-raw-material',
    });
    const result = await request(app.getHttpServer())
      .patch(`${baseUrl}/${rawMaterial.id}`)
      .send({
        name: 'updated-raw-material',
        unitId: unit.id + 1,
        categoryId: category.id + 1,
      })
      .expect(HttpStatus.NOT_FOUND);

    expect(result.body.message).toBe(UnitMessages.NOT_FOUND);
  });

  it('Category not found', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const rawMaterial = await rawMaterialSeeder(repository.repository, {
      unitId: unit.id,
      categoryId: category.id,
      name: 'test-raw-material',
    });
    const result = await request(app.getHttpServer())
      .patch(`${baseUrl}/${rawMaterial.id}`)
      .send({
        name: 'updated-raw-material',
        unitId: unit.id,
        categoryId: category.id + 1,
      })
      .expect(HttpStatus.NOT_FOUND);

    expect(result.body.message).toBe(RawMaterialCategoryMessages.NOT_FOUND);
  });

  it('Name duplicated', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const rawMaterial = await rawMaterialSeeder(repository.repository, {
      unitId: unit.id,
      categoryId: category.id,
      name: 'test-raw-material',
    });
    const result = await request(app.getHttpServer())
      .patch(`${baseUrl}/${rawMaterial.id}`)
      .send({
        name: rawMaterial.name,
        unitId: unit.id,
        categoryId: category.id,
      })
      .expect(HttpStatus.CONFLICT);

    expect(result.body.message).toBe(RawMaterialMessages.NAME_DUPLICATED);
  });

  it('ok', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const rawMaterial = await rawMaterialSeeder(repository.repository, {
      unitId: unit.id,
      categoryId: category.id,
      name: 'test-raw-material',
    });

    const updatedName = 'updated-raw-material';
    const updatedUnit = await unitSeeder(repository.repository, {
      name: 'meter',
      symbol: 'm',
    });
    const updatedCategory = await rawMaterialCategorySeeder(
      repository.repository,
      { name: 'category2' },
    );

    await request(app.getHttpServer())
      .patch(`${baseUrl}/${rawMaterial.id}`)
      .send({
        name: updatedName,
        unitId: updatedUnit.id,
        categoryId: updatedCategory.id,
      })
      .expect(HttpStatus.OK);

    const rawMaterialFound = await repository.repository.rawMaterial.findOne({
      where: { id: rawMaterial.id },
    });
    expect(rawMaterialFound.categoryId).toBe(updatedCategory.id);
    expect(rawMaterialFound.unitId).toBe(updatedUnit.id);
    expect(rawMaterialFound.name).toBe(updatedName);
  });
});
