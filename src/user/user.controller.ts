import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(
    @Body()
    data: {
      name: string;
      lastname: string;
      email: string;
      phone?: string;
    },
  ): Promise<User> {
    return await this.userService.createUser(data);
  }
}
