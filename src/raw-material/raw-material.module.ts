import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierModule } from '../supplier';
import { UnitModule } from '../unit';
import { RawMaterialPriceController } from './controllers/raw-material-price.controller';
import { RawMaterialController } from './controllers/raw-material.controller';
import { RawMaterialCategoryModule } from './raw-material-category';
import { RawMaterialPrice } from './repository/raw-material-price.entity';
import { RawMaterialPriceRepo } from './repository/raw-material-price.repository';
import { RawMaterial } from './repository/raw-material.entity';
import { RawMaterialRepo } from './repository/raw-material.repository';
import { RawMaterialPriceService } from './services/raw-material-price.service';
import { RawMaterialService } from './services/raw-material.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RawMaterial, RawMaterialPrice]),
    RawMaterialCategoryModule,
    UnitModule,
    SupplierModule,
  ],
  controllers: [RawMaterialController, RawMaterialPriceController],
  providers: [
    RawMaterialService,
    RawMaterialRepo,
    RawMaterialPriceRepo,
    RawMaterialPriceService,
  ],
  exports: [RawMaterialService],
})
export class RawMaterialModule {}
