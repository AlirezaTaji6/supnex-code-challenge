import { RawMaterialCategory } from '../../src/raw-material/raw-material-category/repository/raw-material-category.entity';
import { ITestRepository } from '../repository';

export function rawMaterialCategorySeeder(
  repository: ITestRepository,
): Promise<RawMaterialCategory> {
  return repository.rawMaterialCategory.save(
    repository.rawMaterialCategory.create({
      name: 'gram',
    }),
  );
}
