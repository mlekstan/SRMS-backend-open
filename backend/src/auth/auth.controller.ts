import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Login 
   * @remarks This operation allows you to log in to SRMS.
   */
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() request: Request) {
    const loginResult = await this.authService.login(request.user);
    return new LoginResponseDto(loginResult);
  }
}
