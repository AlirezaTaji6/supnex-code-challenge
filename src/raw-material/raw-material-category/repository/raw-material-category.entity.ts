import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ParentEntity } from '../../../database';
import { RawMaterial } from '../../repository/raw-material.entity';

@Entity('raw_material_categories')
@Index('raw_material_categories_name_UNIQUE', ['name'], {
  unique: true,
  where: '("deletedAt" IS NULL)',
})
export class RawMaterialCategory extends ParentEntity {
  @Column()
  name: string;

  @OneToMany(() => RawMaterial, (rawMaterials) => rawMaterials.category)
  rawMaterials: RawMaterial[];
}
