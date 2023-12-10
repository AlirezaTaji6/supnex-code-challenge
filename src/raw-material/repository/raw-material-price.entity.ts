import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ParentEntity } from '../../database';
import { Supplier } from '../../supplier/repository/supplier.entity';
import { RawMaterial } from './raw-material.entity';

@Entity('raw_materials_prices')
@Index('raw_materials_UNIQUE', ['supplierId', 'rawMaterialId'], {
  unique: true,
  where: '("deletedAt" IS NULL)',
})
export class RawMaterialPrice extends ParentEntity {
  @ManyToOne(() => Supplier, (supplier) => supplier.rawMaterialPrices)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column()
  supplierId: number;

  @ManyToOne(() => RawMaterial, (rawMaterial) => rawMaterial.prices)
  @JoinColumn({ name: 'rawMaterialId' })
  rawMaterial: RawMaterial;

  @Column()
  rawMaterialId: number;

  @Column()
  price: number;
}
