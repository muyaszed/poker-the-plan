import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { isActive: true },
      select: ['id', 'email', 'username', 'createdAt', 'updatedAt'],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
      select: [
        'id',
        'email',
        'username',
        'firstname',
        'lastname',
        'createdAt',
        'updatedAt',
      ],
      relations: {
        ownedRooms: true,
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username, isActive: true },
    });

    return user;
  }

  async create(user: Partial<User>): Promise<User> {
    const existingEmail = await this.findByEmail(user.email || '');
    if (existingEmail) {
      throw new ConflictException('Email already exist');
    }
    const exsitingUsername = await this.findByUsername(user.username || '');
    if (exsitingUsername) {
      throw new ConflictException('Username already exist');
    }

    const newUser = this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  async update(id: string, newUser: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    delete newUser.email;
    delete newUser.username;
    delete newUser.password;
    Object.assign(user, newUser);
    return this.userRepository.save(user);
  }

  async softDeleteUser(id: string): Promise<User> {
    const user = await this.findById(id);
    user.isActive = false;
    return this.userRepository.save(user);
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
    });

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }
}
