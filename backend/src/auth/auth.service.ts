import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginResult } from './models/LoginResult';


@Injectable()
export class AuthService {
  private usersService: UsersService;
  private jwtService: JwtService;

  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async validateUser(username: string, password: string) {
    try {
      const user = await this.usersService.findOne(username);

      const isValid = await bcrypt.compare(password, user.password);
      

      if (isValid) {
        const { password, ...result } = user;
        return result;
      }
      return null;
      
    } catch (error) {
      return null;
    }
  }

  async login(user: any): Promise<LoginResult> {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
