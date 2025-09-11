import { Controller, Post, Body, Session, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SessionGuard } from './session.guard'; // 👈 guard import

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ Manager Login
  @Post('login')
  async login(
    @Body() body: { managername: string; password: string },
    @Session() session: Record<string, any>,
  ) {
    console.log('👉 Login hit:', body); // Debug

    const manager = await this.authService.validateManager(
      body.managername,
      body.password,
    );

    if (manager) {
      session.managerId = manager.id;
      session.managerName = manager.managername;

      return {
        message: 'Login successful',
        manager: { id: manager.id, managername: manager.managername },
      };
    }

    return { message: 'Invalid credentials' };
  }

  // ✅ Logout
  @Post('logout')
  logout(@Session() session: Record<string, any>) {
    session.destroy((err) => {
      if (err) console.error('Logout error:', err);
    });
    return { message: 'Logged out successfully' };
  }

  // ✅ Auth check (Dashboard render এর আগে চেক করার জন্য)
  @Get('check')
  check(@Req() req) {
    if (req.session.managerId) {
      return {
        loggedIn: true,
        manager: {
          id: req.session.managerId,
          managername: req.session.managerName,
        },
      };
    }
    return { loggedIn: false };
  }

  // ✅ Protected Profile Route (SessionGuard দিয়ে secure)
  @Get('profile')
  @UseGuards(SessionGuard)
  getProfile(@Session() session: Record<string, any>) {
    return {
      id: session.managerId,
      managername: session.managerName,
    };
  }
}
