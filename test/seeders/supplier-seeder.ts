import { Supplier } from '../../src/supplier/repository/supplier.entity';
import { ITestRepository } from '../repository';

export function supplierSeeder(repository: ITestRepository): Promise<Supplier> {
  return repository.supplier.save(
    repository.supplier.create({
      name: 'gram',
    }),
  );
}
