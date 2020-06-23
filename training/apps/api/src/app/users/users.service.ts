import { Injectable } from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private readonly users = [
    new User(1, 'john', 'change'),
    new User(2, 'chris', 'secret'),
    new User(3, 'maria', 'guess'),
    new User(4, 'a', 'a')
  ];

  constructor() {}

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
