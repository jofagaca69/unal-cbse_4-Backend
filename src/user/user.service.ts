import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(data: { name: string; lastname: string; email: string; phone?: string }): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email: data.email });
    if (existingUser) {
      throw new ConflictException(`User with email ${data.email} already exists`);
    }

    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }
}
