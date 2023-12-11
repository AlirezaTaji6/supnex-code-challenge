import { Unit } from '../../src/unit/repository/unit.entity';
import { ITestRepository } from '../repository';

export function unitSeeder(repository: ITestRepository): Promise<Unit> {
  return repository.unit.save(
    repository.unit.create({
      name: 'gram',
      symbol: 'g',
    }),
  );
}
