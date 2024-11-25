import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api-v1');
  app.enableCors({
    origin: 'http://localhost:5173',
  });
  await app.listen(7777);
}
bootstrap();
