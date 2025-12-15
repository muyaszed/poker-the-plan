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
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Get(':email')
  getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Get(':username')
  getUserByUserName(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @Delete(':id')
  softDeleteUser(id: string): Promise<User> {
    return this.userService.softDeleteUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatedData: User,
  ): Promise<User> {
    return this.userService.updateUser(id, updatedData);
  }
}
