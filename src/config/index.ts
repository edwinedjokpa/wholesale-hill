import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const appConfig = {
  // General settings
  NODE_ENV: configService.get<string>('NODE_ENV', 'development'),

  // Server settings
  PORT: configService.get<number>('PORT', 3000),

  // Other settings
  APP_URL: configService.get<string>('APP_URL', 'http://localhost:3000'),

  // Database settings
  DB_HOST: configService.getOrThrow<string>('DB_HOST'),
  DB_PORT: configService.getOrThrow<number>('DB_PORT', 5432),
  DB_USERNAME: configService.getOrThrow<string>('DB_USERNAME'),
  DB_PASSWORD: configService.getOrThrow<string>('DB_PASSWORD'),
  DB_DATABASE: configService.getOrThrow<string>('DB_DATABASE'),
  DB_SSL_MODE: configService.get<string>('DB_SSL_MODE', 'false') === 'true',

  // JWT settings
  JWT_SECRET: configService.get<string>('JWT_SECRET', 'your_jwt_secret'),
  JWT_EXPIRES_IN: configService.get<string>('JWT_EXPIRES_IN', '1h'),
};
