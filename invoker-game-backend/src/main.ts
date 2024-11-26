import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api-v1');

  const allowedOrigins = [
    'http://localhost:5173',
    'https://invoker-mastery.vercel.app',
    'http://85.159.231.74:4174',
  ];
  app.enableCors({ origin: allowedOrigins });
  await app.listen(7777);
}
bootstrap();
