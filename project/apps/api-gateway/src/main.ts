import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from './app/interceptors/request-id.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';
  const DEFAULT_PORT = 3000;
  const port = process.env.PORT || DEFAULT_PORT;

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The "API-Gateway" service')
    .setDescription('API-Gateway service API')
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/spec', app, document);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalInterceptors(new RequestIdInterceptor());
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
  Logger.log(
    `📚 Swagger UI is available at: http://localhost:${port}/${GLOBAL_PREFIX}/spec`
  );
}

bootstrap();
