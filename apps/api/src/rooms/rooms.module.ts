import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { RoomsGateway } from './rooms.gateaway';
import { JwtService } from '@nestjs/jwt';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User])],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    UsersService, 
    RoomsGateway,
    EventsGateway,
    JwtService
  ],
})
export class RoomsModule {}
