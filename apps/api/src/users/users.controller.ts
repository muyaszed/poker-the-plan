import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from 'src/auth/dto/auth-response.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() registerDto: RegisterDto): Promise<UserResponseDto> {
    const user = await this.userService.create(registerDto);
    return new UserResponseDto(user);
  }

  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserResponseDto(user));
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return new UserResponseDto(await this.userService.findById(id));
  }

  //   @Get(':email')
  //   async getUserByEmail(
  //     @Param('email') email: string,
  //   ): Promise<UserResponseDto> {
  //     return new UserResponseDto(await this.userService.findByEmail(email));
  //   }

  //   @Get(':username')
  //   async getUserByUserName(
  //     @Param('username') username: string,
  //   ): Promise<UserResponseDto> {
  //     return new UserResponseDto(await this.userService.findByUsername(username));
  //   }

  @Delete(':id')
  async softDeleteUser(id: string): Promise<UserResponseDto> {
    return new UserResponseDto(await this.userService.softDeleteUser(id));
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedData: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return new UserResponseDto(await this.userService.update(id, updatedData));
  }
}
