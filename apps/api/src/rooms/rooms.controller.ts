import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { User } from 'src/users/user.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoomResponseDto } from './dto/room-response.dto';
import { Room } from './room.entity';
import { EnterRoomDto, LeaveRoomDto } from './dto/enter-room.dto';

@Controller('rooms')
@UseGuards(JwtGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll(): Promise<RoomResponseDto[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Get('/my-room/:userId')
  findMyRoom(@Param('userId') userId: string) {
    return this.roomsService.findMyRoom(userId);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  // @Post(':id/enter')
  // enter(@Param('id') id: string, @Body() payload: EnterRoomDto) {
  //   return this.roomsService.enter(id, payload);
  // }

  // @Post(':id/leave')
  // leave(@Param('id') id: string, @Body() payload: LeaveRoomDto) {
  //   return this.roomsService.leave(id, payload);
  // }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
