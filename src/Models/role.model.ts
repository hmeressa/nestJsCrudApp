import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEntity } from '../Models/user.model'
import {UserJwt} from "../Jwt/user.jwt";
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[];
}
