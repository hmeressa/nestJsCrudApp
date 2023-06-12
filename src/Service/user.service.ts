import { Injectable, NotFoundException, Req, Res } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { UserRepository } from "../Repository/user.repository";
import { NotCreated } from "../Exception/notCreated";
import { NotFound } from "../Exception/notFound";
import { UserEntity } from "../Models/user.model";
import { UserUpdateDto } from "../Dto/userUpdate.dto";
import { UserDto } from "../Dto/user.dto";
import {UserJwt} from "../Jwt/user.jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: UserRepository) {
  }
  async checkIfUserExists(Email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({where: {Email}});
    return !!user;
  }
  async findAll(): Promise<any> {
  
    const   users = await this.userRepository.find();
    let userDataWithOutPassword = [];
    users.map(user=>{
      const  { Password, ...usersData} = user;
      userDataWithOutPassword.push(usersData)
    })
    
    if(users.length === 0 ) {
      throw new NotFoundException ( "User NOT FOUND" )
    }
    return {
      Message : "List of users",
      Users : userDataWithOutPassword
    }
  }
  async findOneBy(id: any): Promise<any> {
    const user = await this.userRepository.findOneBy({id:id});
    if(user === null){
      throw new NotFound()
    }
    const { Password, ...userWithOutPassword} = user;
    return {
      User : userWithOutPassword
    };
  }
  async create( userDto : UserDto ): Promise<any> {
    const { Email } = userDto;
    const isFound = await this.checkIfUserExists(Email);
    if (isFound) {
      return { Message: `User already exists with the email of ${Email}` }
    }
    else {
      const userCreate = await this.userRepository.create(userDto);
      const user = await this.userRepository.save(userCreate);
      console.log(user)
      if (!user) {
        throw new NotCreated()
      }
      return {
        User : user,
        Message: "User is created successfully"
      }
    }
  }
  async update(id: number, userUpdateDto: UserUpdateDto): Promise<any> {

    const { Email } = userUpdateDto;
    const userResult = await this.userRepository.findOneById(id);
    if(userResult === null){
      throw new NotFoundException("User is not found with provided id");
    }
    const isFound = await this.checkIfUserExists(Email);
    if(isFound){
      return {
        message : `User is found with the requested email address i,e ${Email} try other email`}
    }
    else{
      const user = await this.userRepository.update(id, userUpdateDto);
      if(!user){
        throw new NotCreated( "User can not updated")
      }
      return {
        Message : "User is successfully updated"
      }
    }

  }
  async delete(id: number): Promise<any> {
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected === 1) {
      return `User is deleted with the provided id`;
    } else {
      throw new NotFoundException("User is not found with the provided id")
    }
  }
}
