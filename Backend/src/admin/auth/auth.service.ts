import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        this.logger.warn(
          `Login attempt failed: User not found for email: ${email}`,
        );
        return null;
      }

      this.logger.log(`User found: ${user.email}, Role: ${user.role}`);

      // Check if password looks like a bcrypt hash
      const isValidHash = user.password && user.password.startsWith('$2b$');
      if (!isValidHash) {
        this.logger.error(
          `Invalid password format for user ${email}. Password should be bcrypt hashed.`,
        );
        return null;
      }

      const passwordMatch = await bcrypt.compare(pass, user.password);
      this.logger.log(
        `Password comparison result for ${email}: ${passwordMatch}`,
      );

      if (passwordMatch) {
        const { password, ...result } = user;
        this.logger.log(`Authentication successful for ${email}`);
        return result;
      } else {
        this.logger.warn(
          `Login attempt failed: Invalid password for email: ${email}`,
        );
        return null;
      }
    } catch (error) {
      this.logger.error(`Error during user validation for ${email}:`, error);
      return null;
    }
  }

  async login(user: any) {
    try {
      const payload = { email: user.email, sub: user.id, role: user.role };
      const token = this.jwtService.sign(payload);

      this.logger.log(
        `JWT token generated successfully for user: ${user.email}`,
      );

      return {
        access_token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      this.logger.error(
        `Error generating JWT token for user ${user.email}:`,
        error,
      );
      throw new UnauthorizedException(
        'Failed to generate authentication token',
      );
    }
  }
}
