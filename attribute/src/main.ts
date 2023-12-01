import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // security middlewares
  app.enableCors();

  // Validation
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));

  // OpenAPI Specification
  const config = new DocumentBuilder()
    .setTitle('Attributes API')
    .setDescription(    
      'A REST API using Nestjs to create CRUD operations on Attribute table',
    )
    .setVersion('1.0')
    .addTag('attributes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
} 
bootstrap();
