import { Unit } from '../../src/unit/repository/unit.entity';
import { ITestRepository } from '../repository';

export function unitSeeder(
  repository: ITestRepository,
  input?: { name: string; symbol: string },
): Promise<Unit> {
  return repository.unit.save(
    repository.unit.create({
      name: input ? input.name : 'gram',
      symbol: input ? input.symbol : 'g',
    }),
  );
}
