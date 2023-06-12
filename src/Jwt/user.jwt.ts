import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserJwt {
    constructor(private readonly jwtService: JwtService) {}
    async generateToken(userId: any, username: any): Promise<any> {
        const payload = { userId, username };
        return this.jwtService.signAsync(payload);
    }
     verifyToken(token: any, secret: any): any {
        return this.jwtService.verifyAsync(token, secret);
    }
}
