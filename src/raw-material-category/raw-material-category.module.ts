import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialCategoryController } from './raw-material-category.controller';
import { RawMaterialCategoryService } from './raw-material-category.service';
import { RawMaterialCategory } from './repository/raw-material-category.entity';
import { RawMaterialCategoryRepo } from './repository/raw-material-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterialCategory])],
  controllers: [RawMaterialCategoryController],
  providers: [RawMaterialCategoryService, RawMaterialCategoryRepo],
  exports: [RawMaterialCategoryService],
})
export class RawMaterialCategoryModule {}
