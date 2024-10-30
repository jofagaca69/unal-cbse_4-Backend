import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_user' })
  async getUser(data: { id: number }) {
    return await this.userService.getUserById(data.id);
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: { name: string; lastname: string; email: string; phone?: string }): Promise<User> {
    return await this.userService.createUser(data);
  }
}
