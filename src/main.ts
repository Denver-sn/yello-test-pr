import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { LoggerService } from './logger/logger.service';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes and filters
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
