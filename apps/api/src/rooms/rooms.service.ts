import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { RoomResponseDto } from './dto/room-response.dto';
import { UsersService } from 'src/users/users.service';
import { RoomsGateway } from './rooms.gateaway';
import { EnterRoomDto, LeaveRoomDto } from './dto/enter-room.dto';

@Injectable()
export class RoomsService {
  constructor(
      @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
      private readonly userService: UsersService,
      @Inject(forwardRef(() => RoomsGateway))
      private readonly roomsGateaway: RoomsGateway,
    ) {}
  async create(createRoomDto: CreateRoomDto): Promise<RoomResponseDto> {
        const room =  await this.roomRepository.findOne({
          where: { name: createRoomDto.name },
        });

        if (room) {
          throw new ConflictException('Room name already exist');
        }

        const owner = await this.userService.findById(createRoomDto.userId);
        const newRoom = this.roomRepository.create(createRoomDto);
        newRoom.owner = owner;
        
        const savedroom =  await this.roomRepository.save(newRoom);
        this.roomsGateaway.updateRooms();
        return new RoomResponseDto(savedroom);
  }

  async findAll(): Promise<RoomResponseDto[]> {
    const allRooms = await this.roomRepository.find()
    return allRooms.map(room => new RoomResponseDto(room));
  }

  async findOne(id: string): Promise<RoomResponseDto> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: {
        users: true,
      }
    });
    
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return new RoomResponseDto(room);
  }

  async findMyRoom(userId): Promise<RoomResponseDto[]> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.ownedRooms.map(room => new RoomResponseDto(room));
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.findOne({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }
    Object.assign(room, updateRoomDto);
    return new RoomResponseDto(await this.roomRepository.save(room));
  }

  async enter(roomId: string, payload: EnterRoomDto) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: {
        users: true,
        owner: true,
      }
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }
    const user = await this.userService.findById(payload.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (room.users.find(roomUser => roomUser.id === user.id)) {
      throw new ConflictException('User already in the room');
    }
    room.users.push(user);
    const savedroom = await this.roomRepository.save(room);

    return new RoomResponseDto(savedroom);
  }

  async leave(roomId: string, payload: LeaveRoomDto) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: {
        users: true,
        owner: true,
      }
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const user = room.users.find(user => user.id === payload.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(room, {
      users: room.users.filter(roomUser => roomUser.id !== user.id),
    });
    
    const savedRoom = await this.roomRepository.save(room);

    return new RoomResponseDto(savedRoom);
  }

  async remove(id: string) {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: {
        users: true,
        owner: true,
      }
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }
    const test = await this.roomRepository.remove(room);
    this.roomsGateaway.updateRooms();

}
}


