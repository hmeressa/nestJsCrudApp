
import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "../Service/auth.service";
import { AuthDto } from "../Dto/auth.dto";
import { Request, Response } from "express";
import { UserJwt} from "../Jwt/user.jwt"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly userJwt: UserJwt) {}
  @Post()
  async userAuth(@Res({ passthrough : true}) response : Response, @Req() request : Request, @Body() authDto : AuthDto) : Promise<any>{
    const user = await this.authService.userAuth(authDto);
    const tokens = await this.userJwt.generateToken(user.id,user.username);
    return {
        message : "User is successfully logged in",
        User : {user,tokens},
        statusCode : 200
    }
  }
  @Post('logout')
  async logout(@Req() request : Request) : Promise<any>{
    const cookies = request.cookies[ 'jwt' ];
    return {
        Message : "Cookies are successfully cleared"
    }
  }
}
