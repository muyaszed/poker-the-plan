import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto, UserResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      const user = await this.userService.create(registerDto);
      const payload = { sub: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      const userResponse = new UserResponseDto(user);

      return new AuthResponseDto(userResponse, accessToken);
    } catch (e) {
      if (e instanceof ConflictException) {
        throw e;
      }

      throw new ConflictException('Registration failed');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.validate(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const userResponse = new UserResponseDto(user);
    return new AuthResponseDto(userResponse, accessToken);
  }

  async validateUserById(userId: string): Promise<User | null> {
    try {
      return await this.userService.findById(userId);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
