import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from "../Models/user.model";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
