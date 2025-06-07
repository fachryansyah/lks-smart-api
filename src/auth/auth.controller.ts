import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './dtos/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterRequest, RegisterResponse } from './dtos/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(payload);
  }

  @Post('register')
  async register(@Body() payload: RegisterRequest): Promise<RegisterResponse> {
    return this.authService.register(payload);
  }
}
