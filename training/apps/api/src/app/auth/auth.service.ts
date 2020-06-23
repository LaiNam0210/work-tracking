import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtExpireDuration } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<{ id: string; username: string } | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: {
    userId: number;
    username: string;
  }): Promise<{ accessToken: string; expirationDate: number }> {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: jwtExpireDuration
      }),
      expirationDate: new Date().getTime() - jwtExpireDuration * 1000
    };
  }
}
