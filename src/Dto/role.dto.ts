
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
class RoleDto {
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

