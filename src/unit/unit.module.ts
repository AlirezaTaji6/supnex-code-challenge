import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './repository/unit.entity';
import { UnitRepo } from './repository/unit.repository';
import { UnitController } from './unit.controller';
import { UnitsService } from './unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  controllers: [UnitController],
  providers: [UnitsService, UnitRepo],
  exports: [UnitsService],
})
export class UnitModule {}
