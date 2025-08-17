import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization=request.headers.authorization;
        const token =  authorization.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Unauthorized');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.customer={
                id:payload.sub,
                email:payload.email,
            }
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
        return true;
    }
}