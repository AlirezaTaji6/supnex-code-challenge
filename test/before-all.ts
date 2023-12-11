import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CommonResponseInterceptor, validationOptions } from '../src/common';
import { appConfig, configValidation, databaseConfig } from '../src/config';
import { TypeOrmConfigService } from '../src/database';
import { RawMaterialModule } from '../src/raw-material';
import { StockTransactionModule } from '../src/stock-transaction';
import { SupplierModule } from '../src/supplier';
import { UnitModule } from '../src/unit';

export async function beforeAllUtil(): Promise<{
  app: INestApplication;
  moduleFixture: TestingModule;
  configService: ConfigService;
}> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [appConfig, databaseConfig],
        validationSchema: configValidation,
        validationOptions: {
          abortEarly: true,
        },
        envFilePath: ['.env.test'],
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
  }).compile();

  const app = moduleFixture.createNestApplication<NestExpressApplication>({
    logger: false,
  });

  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new CommonResponseInterceptor());

  await app.init();

  return { app, moduleFixture, configService };
}
