import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import {
  CommonResponseInterceptor,
  Environments,
  validationOptions,
} from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  const env = configService.get('app.env');
  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new CommonResponseInterceptor());
  const reflector = app.get(Reflector);

  if (env !== Environments.PRODUCTION) {
    const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API docs')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(configService.get('swagger.url'), app, document);
  }
  await app.listen(configService.get('app.port'));
}

bootstrap();
