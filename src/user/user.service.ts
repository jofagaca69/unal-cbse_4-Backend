import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserById(id: number) {
    return { id, name: 'Nombre del usuario' };
  }
}
