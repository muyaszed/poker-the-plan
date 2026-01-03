import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";
import { User } from "src/users/user.entity";

export class CreateRoomDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(20, { message: 'Name must be less then 20 chracters long' })
    @Matches(/^[a-zA-Z0-9_ ]+$/, {
    message: 'Name can only contain letters, numbers and underescores',
    })
    name: string;

    @IsString({ message: 'User ID must be a string' })
    @IsNotEmpty({ message: 'User id is required' })
    userId: string;
}
