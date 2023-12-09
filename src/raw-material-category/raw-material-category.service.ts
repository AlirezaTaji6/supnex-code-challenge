import { Injectable } from '@nestjs/common';
import { DeleteFailed, IListCount, SearchDto, UpdateFailed } from '../common';
import {
  CreateRawMaterialCategoryDto,
  UpdateRawMaterialCategoryDto,
} from './dto';
import {
  RawMaterialCategoryNameDuplicated,
  RawMaterialCategoryNotFound,
} from './raw-material-category.exception';
import { RawMaterialCategory } from './repository/raw-material-category.entity';
import { RawMaterialCategoryRepo } from './repository/raw-material-category.repository';

@Injectable()
export class RawMaterialCategoryService {
  constructor(private readonly repo: RawMaterialCategoryRepo) {}
  async create(
    dto: CreateRawMaterialCategoryDto,
  ): Promise<RawMaterialCategory> {
    await this.isDuplicated(dto.name);
    return this.repo.save(this.repo.create(dto));
  }

  async isDuplicated(name: string) {
    const exists = await this.repo.findByName(name);
    if (exists) throw new RawMaterialCategoryNameDuplicated();
  }

  findAll(dto: SearchDto): Promise<IListCount<RawMaterialCategory>> {
    return this.repo.findMany(dto);
  }

  async findOne(id: number): Promise<RawMaterialCategory> {
    const rawMaterialCategory = await this.repo.findById(id);
    if (!rawMaterialCategory) throw new RawMaterialCategoryNotFound();
    return rawMaterialCategory;
  }

  async update(id: number, dto: UpdateRawMaterialCategoryDto) {
    await this.isDuplicated(dto.name);
    const { affected } = await this.repo.update(id, dto);
    if (!affected) throw new UpdateFailed();
  }

  async delete(id: number) {
    const { affected } = await this.repo.softDelete(id);
    if (!affected) throw new DeleteFailed();
  }
}
