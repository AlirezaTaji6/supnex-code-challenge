import { RawMaterial } from '../../src/raw-material/repository/raw-material.entity';
import { ITestRepository } from '../repository';

export function rawMaterialSeeder(
  repository: ITestRepository,
  {
    name,
    categoryId,
    unitId,
  }: { name: string; categoryId: number; unitId: number },
): Promise<RawMaterial> {
  return repository.rawMaterial.save(
    repository.rawMaterial.create({
      name,
      categoryId,
      unitId,
    }),
  );
}
