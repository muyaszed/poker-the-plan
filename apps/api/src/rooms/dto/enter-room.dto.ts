import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";
import { User } from "src/users/user.entity";

export class EnterRoomDto {
    @IsString({ message: 'User ID must be a string' })
    @IsNotEmpty({ message: 'User id is required' })
    userId: string;
}

export class LeaveRoomDto extends EnterRoomDto {}
