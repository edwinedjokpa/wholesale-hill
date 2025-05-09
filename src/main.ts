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
      transform: true,
      whitelist: true,
    }),
  );

  // Register both filters globally
  app.useGlobalFilters(new GraphQLExceptionFilter());

  app.enableShutdownHooks();
  await app.listen(PORT);
}
bootstrap();
