import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class AuthDto{
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  Email: string;

  @IsNotEmpty()
  @IsString()
  Password: string
}