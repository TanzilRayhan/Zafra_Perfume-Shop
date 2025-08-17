import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret-key', // Must be the same secret as in the module
    });
  }

  async validate(payload: any) {
    // The payload is the decoded JWT. We can use its data.
    // NestJS will attach the returned object to request.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}