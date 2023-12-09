import { Column, Entity, Index } from 'typeorm';
import { ParentEntity } from '../../database';

@Entity('raw_material_categories')
@Index('raw_material_categories_name_UNIQUE', ['name'], {
  unique: true,
  where: '("deletedAt" IS NULL)',
})
export class RawMaterialCategory extends ParentEntity {
  @Column()
  name: string;
}
