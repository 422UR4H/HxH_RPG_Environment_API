import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(helmet());
  await app.listen(process.env.PORT || 3000);
  console.log(`server is running on port ${process.env.PORT || 3000}`);
}
bootstrap();
