import { Column, Entity, Index } from 'typeorm';
import { ParentEntity } from '../../database';

@Entity('suppliers')
@Index('suppliers_name_UNIQUE', ['name'], {
  unique: true,
  where: '("deletedAt" IS NULL)',
})
export class Supplier extends ParentEntity {
  @Column()
  name: string;
}
