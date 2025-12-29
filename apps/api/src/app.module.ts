import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { APP_GUARD } from '@nestjs/core';
import { WebsocketGuard } from './auth/guard/websocket.guard';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { dataSourceOption } from './typeorm.config';
dotenv.config();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOption),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: WebsocketGuard,
    },
    JwtService,
  ],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
