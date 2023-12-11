import { Supplier } from '../../src/supplier/repository/supplier.entity';
import { ITestRepository } from '../repository';

export function supplierSeeder(
  repository: ITestRepository,
  input?: { name: string },
): Promise<Supplier> {
  return repository.supplier.save(
    repository.supplier.create({
      name: input ? input.name : 'gram',
    }),
  );
}
