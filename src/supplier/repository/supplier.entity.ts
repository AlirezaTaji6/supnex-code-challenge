import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ParentEntity } from '../../database';
import { RawMaterialPrice } from '../../raw-material/repository/raw-material-price.entity';

@Entity('suppliers')
@Index('suppliers_name_UNIQUE', ['name'], {
  unique: true,
  where: '("deletedAt" IS NULL)',
})
export class Supplier extends ParentEntity {
  @Column()
  name: string;

  @OneToMany(
    () => RawMaterialPrice,
    (rawMaterialPrices) => rawMaterialPrices.supplier,
  )
  rawMaterialPrices: RawMaterialPrice[];
}
