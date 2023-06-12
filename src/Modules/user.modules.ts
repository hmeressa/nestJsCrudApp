import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from "../Repository/user.repository";
import {UserController} from "../Controller/user.controller";
import {UserService} from "../Service/user.service";
import {UserEntity} from "../Models/user.model";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService]
})

export class UserModules {
}
