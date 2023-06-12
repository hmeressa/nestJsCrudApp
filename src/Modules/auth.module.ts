import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../Models/user.model";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserRepository } from "../Repository/user.repository";
import { keySecret } from "../Constants/key.secret";
import { PassportModule } from "@nestjs/passport";
import {AuthController} from "../Controller/auth.controller";
import {AuthService} from "../Service/auth.service";
import {UserJwt} from "../Jwt/user.jwt";



@Module({
  imports: [ PassportModule,
      TypeOrmModule.forFeature([UserEntity]),
              JwtModule.register(keySecret)],

  providers : [AuthService, UserRepository,UserJwt ],
  controllers : [ AuthController  ],
  exports : [ ]
})
export class AuthModule{}