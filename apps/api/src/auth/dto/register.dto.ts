import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username must be less then 20 chracters long' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers and underescores',
  })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password must be less then 50 chracters long' })
  password: string;

  @IsString({ message: 'Firstname must be a string' })
  @IsOptional()
  @MaxLength(50, { message: 'Firstname must be less then 50 chracters long' })
  firstname: string;

  @IsString({ message: 'Lastname must be a string' })
  @IsOptional()
  @MaxLength(50, { message: 'Lastname must be less then 50 chracters long' })
  lastname: string;
}
