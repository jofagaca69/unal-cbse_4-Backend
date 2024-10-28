import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {

    constructor( private readonly userService: UserService ) { }

    @MessagePattern({ cmd: 'get_user' })
    getUser(data: { id: number }) {
        return this.userService.getUserById(data.id);
    }
}
