import { Expose } from 'class-transformer';
import { UserResponseDto } from 'src/auth/dto/auth-response.dto';

export class RoomResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  ownerId: UserResponseDto['id'];

  @Expose()
  users: UserResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<RoomResponseDto>) {
    Object.assign(this, partial);
  }
}


