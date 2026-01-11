import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// http://localhost:3000/auth

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() user: { email: string; password: string }) {
    return this.authService.login(user.email, user.password);
  }
}
