import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  appConfig,
  configValidation,
  databaseConfig,
  swaggerConfig,
} from './config';
import { TypeOrmConfigService } from './database';
import { RawMaterialModule } from './raw-material';
import { StockTransactionModule } from './stock-transaction';
import { SupplierModule } from './supplier';
import { UnitModule } from './unit';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, swaggerConfig, databaseConfig],
      validationSchema: configValidation,
      validationOptions: {
        abortEarly: true,
      },
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    UnitModule,
    SupplierModule,
    RawMaterialModule,
    StockTransactionModule,
  ],
})
export class AppModule {}
