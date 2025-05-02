import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig } from 'src/config';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: appConfig.DB_HOST,
      port: appConfig.DB_PORT,
      username: appConfig.DB_USERNAME,
      password: appConfig.DB_PASSWORD,
      database: appConfig.DB_DATABASE,
      ssl: appConfig.DB_SSL_MODE ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
      entities: [User],
      synchronize: true,
      logging: false,
      migrations: ['../database/migrations/*{.ts,.js}'],
    }),
  ],
})
export class DatabaseModule {}
