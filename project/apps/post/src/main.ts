import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';
  const DEFAULT_PORT = 3000;
  const port = process.env.PORT || DEFAULT_PORT;

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The "Post" service')
    .setDescription('Posts service API')
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/spec', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
  Logger.log(`📚 Swagger UI is available at: http://localhost:${port}/${GLOBAL_PREFIX}/spec`);
}

bootstrap();
