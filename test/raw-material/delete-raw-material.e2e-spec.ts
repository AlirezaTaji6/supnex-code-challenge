import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommonErrors } from '../../src/common';
import { beforeAllUtil } from '../before-all';
import { TestRepository } from '../repository';
import { rawMaterialCategorySeeder } from '../seeders/raw-material-category-seeder';
import { rawMaterialSeeder } from '../seeders/raw-material-seeder';
import { unitSeeder } from '../seeders/unit-seeder';
import { ValidationTester } from '../validation-tester';

describe('Delete Raw Material (e2e)', () => {
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
      .delete(`${baseUrl}/a`)
      .send({})
      .expect(HttpStatus.BAD_REQUEST);

    new ValidationTester(result.body.errors).isFirstLayer(['id']);
  });

  it('Delete failed', async () => {
    const result = await request(app.getHttpServer())
      .delete(`${baseUrl}/1`)
      .send()
      .expect(HttpStatus.SERVICE_UNAVAILABLE);

    expect(result.body.message).toBe(CommonErrors.DELETE_FAILED);
  });

  it('ok', async () => {
    const unit = await unitSeeder(repository.repository);
    const category = await rawMaterialCategorySeeder(repository.repository);
    const name = 'test-raw-material';

    const rawMaterial = await rawMaterialSeeder(repository.repository, {
      name,
      categoryId: category.id,
      unitId: unit.id,
    });

    await request(app.getHttpServer())
      .delete(`${baseUrl}/${rawMaterial.id}`)
      .send({ name, unitId: unit.id, categoryId: category.id })
      .expect(HttpStatus.OK);

    const rawMaterialFound = await repository.repository.rawMaterial.findOne({
      where: { id: rawMaterial.id },
    });
    expect(rawMaterialFound).toBeNull();
  });
});
