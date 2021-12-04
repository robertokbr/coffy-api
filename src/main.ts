import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './shared/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000, () => {
    logger.info({
      message: 'App started on port 3000 🚀',
      context: 'NestApplication',
    });
  });
}
bootstrap();
