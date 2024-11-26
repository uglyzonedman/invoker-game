import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api-v1');

  const allowedOrigins = [
    'http://localhost:5173',
    'https://invoker-mastery.vercel.app',
  ];
  app.enableCors({ credentials: true, origin: allowedOrigins });
  await app.listen(7777);
}
bootstrap();
