import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(20, { message: 'Name must be less then 20 chracters long' })
    @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Name can only contain letters, numbers and underescores',
    })
    name: string;
}
