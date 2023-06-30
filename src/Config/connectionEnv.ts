import {UserEntity} from "../Models/user.model";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const DatabaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'postgres',
    entities: [UserEntity],
    synchronize: true,
    migrationsRun: true
};
