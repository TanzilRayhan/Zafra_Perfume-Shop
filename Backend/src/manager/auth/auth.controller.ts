import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ Manager Login
  @Post('login')
  async login(
    @Body() body: { managername: string; password: string },
    @Session() session: Record<string, any>,
  ) {
    const manager = await this.authService.validateManager(body.managername, body.password);

    if (manager) {
      session.managerId = manager.id; 
      return { message: 'Login successful', managerId: manager.id };
    }

    return { message: 'Invalid credentials' };
  }

  // ✅ Logout
  @Post('logout')
  logout(@Session() session: Record<string, any>) {
    session.destroy(); 
    return { message: 'Logged out successfully' };
  }
}
