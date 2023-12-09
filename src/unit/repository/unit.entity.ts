import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('units')
@Index('units_name_UNIQUE', ['name'], {
  unique: true,
  where: '("deletedAt" IS NULL)',
})
@Index('units_symbol_UNIQUE', ['symbol'], {
  unique: true,
  where: '("deletedAt" IS NULL)',
})
export class Unit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
