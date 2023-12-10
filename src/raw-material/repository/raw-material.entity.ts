import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ParentEntity } from '../../database';
import { StockTransaction } from '../../stock-transaction/entities/stock-transaction.entity';
import { Unit } from '../../unit/repository/unit.entity';
import { RawMaterialCategory } from '../raw-material-category/repository/raw-material-category.entity';
import { RawMaterialPrice } from './raw-material-price.entity';

@Entity('raw_materials')
@Index('raw_materials_name_UNIQUE', ['name', 'categoryId'], {
  unique: true,
  where: '("deletedAt" IS NULL)',
})
export class RawMaterial extends ParentEntity {
  @Column()
  name: string;

  @ManyToOne(() => RawMaterialCategory, (category) => category.rawMaterials)
  @JoinColumn({ name: 'categoryId' })
  category: RawMaterialCategory;

  @Column()
  categoryId: number;

  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'unitId' })
  unit: Unit;

  @Column()
  unitId: number;

  @OneToMany(() => RawMaterialPrice, (prices) => prices.rawMaterial)
  prices: RawMaterialPrice[];

  @OneToMany(
    () => StockTransaction,
    (stockTransactions) => stockTransactions.rawMaterial,
  )
  stockTransactions: StockTransaction[];
}
