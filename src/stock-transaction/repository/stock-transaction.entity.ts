import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RawMaterial } from '../../raw-material/repository/raw-material.entity';
import { Supplier } from '../../supplier/repository/supplier.entity';

@Entity('stock_transactions')
export class StockTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RawMaterial, (rawMaterial) => rawMaterial.stockTransactions)
  @JoinColumn({ name: 'rawMaterialId' })
  rawMaterial: RawMaterial;

  @Column()
  @Index()
  rawMaterialId: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.stockTransactions)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column()
  @Index()
  supplierId: number;

  @Column()
  count: number;

  @Column()
  balance: number; // balance: last transaction balance + count

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
