import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ParentEntity } from '../../database';
import { RawMaterial } from '../../raw-material/repository/raw-material.entity';
import { Supplier } from '../../supplier/repository/supplier.entity';

@Entity('stock-transactions')
export class StockTransaction extends ParentEntity {
  @ManyToOne(() => RawMaterial, (rawMaterial) => rawMaterial.stockTransactions)
  @JoinColumn({ name: 'rawMaterialId' })
  rawMaterial: RawMaterial;

  @Column()
  rawMaterialId: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.stockTransactions)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column()
  supplierId: number;

  @Column()
  count: number;

  @Column()
  balance: number; // balance: last transaction balance + count
}
