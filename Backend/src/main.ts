import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS as mentioned in Lecture 5.0 [cite: 1429, 1430]
  app.enableCors();

  // Use GlobalPipes for validation, as shown in Lecture 3.0 [cite: 2311]
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();