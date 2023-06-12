import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '12345678910', // Replace with your secret key for signing/verifying the token
        });
    }

    async validate(payload: any) {
        // Add additional validation or checks on the payload if needed
        // You can also retrieve additional user information based on the payload

        return { userId: payload.sub, username: payload.username };
    }
}
