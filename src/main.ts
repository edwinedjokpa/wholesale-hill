import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { appConfig } from './config';
import { GraphQLExceptionFilter } from './common/filters/global-error-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = appConfig.PORT;

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new GraphQLExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
