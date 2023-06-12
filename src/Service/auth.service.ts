
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "../Dto/auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../Repository/user.repository";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../Models/user.model";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity)
                private readonly userRepository: UserRepository) {}

    async userAuth(authDto: AuthDto): Promise<any> {
        const {Email} = authDto;
        const user = await this.userRepository.findOne({where: {Email}});
        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }
        if (!await this.checkPassword(authDto.Password, user.Password)) {
            throw new UnauthorizedException("Invalid credentials")
        }
        else {
            return user;
        }
    }
    async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compareSync(password, hashedPassword);
    }
}
