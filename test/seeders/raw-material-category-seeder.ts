import { RawMaterialCategory } from '../../src/raw-material/raw-material-category/repository/raw-material-category.entity';
import { ITestRepository } from '../repository';

export function rawMaterialCategorySeeder(
  repository: ITestRepository,
  input?: { name: string },
): Promise<RawMaterialCategory> {
  return repository.rawMaterialCategory.save(
    repository.rawMaterialCategory.create({
      name: input ? input.name : 'gram',
    }),
  );
}
