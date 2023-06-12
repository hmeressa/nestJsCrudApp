import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserUpdateDto {

  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsString()
  @IsNotEmpty()
  Password: string;

  @IsNotEmpty()
  @IsString()
  Role : string
}

