import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The "User" service')
    .setDescription('Users service API')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/spec', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('application.port');

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
  Logger.log(`📚 Swagger UI is available at: http://localhost:${port}/${GLOBAL_PREFIX}/spec`);
}

bootstrap();
