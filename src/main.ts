import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './shared/logger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Coffy API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .setDescription(
      'Coffy API is the API of the app Coffy made with react native, and located at my Github',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000, () => {
    logger.info({
      message: 'App started on port 3000 🚀',
      context: 'NestApplication',
    });
  });
}

bootstrap();
