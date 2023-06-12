import { NestMiddleware, UnauthorizedException} from "@nestjs/common";
import { keySecret } from '../Constants/key.secret'
import {NextFunction} from "express";
import * as jwt from 'jsonwebtoken'
import {UserJwt} from "../Jwt/user.jwt";
import {JwtService} from "@nestjs/jwt";
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly userJwt : UserJwt,
                private readonly jwtService: JwtService) {}
     async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    try{
        // get users tokens from the headers and extract it
        const userTokens = req.headers['authorization'];
        if ( userTokens && userTokens.split(" ")[0] === "Bearer") {
            if (userTokens.split(" ")[1] && await this.userJwt.verifyToken(userTokens.split(" ")[1], keySecret.secret)) {
                    next();
                  }
            }
        else{
            throw new UnauthorizedException("User credentials is incorrect")
        }
    }catch (error){
        throw new UnauthorizedException("User credentials is incorrect")
    }
    }
  }