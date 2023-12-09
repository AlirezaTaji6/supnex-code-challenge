import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierRepo } from './repository/suppler.repository';
import { Supplier } from './repository/supplier.entity';
import { SupplierController } from './supplier.controller';
import { SuppliersService } from './supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [SupplierController],
  providers: [SuppliersService, SupplierRepo],
  exports: [SuppliersService],
})
export class SupplierModule {}
