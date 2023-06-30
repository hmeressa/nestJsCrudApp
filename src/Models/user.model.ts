import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { hashSync } from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

@Entity("Users")
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn('uuid')
  Username: string;
  @BeforeInsert()
  async generateId() : Promise<any> {
    this.Username = await uuidv4();
  }

  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column()
  Password: string;
  
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<any> {
    if (this.Password) {
      this.Password = hashSync ( this.Password, 10 ); // Hash the password before saving
    }
  }
  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.Password);
  }

  @Column()
  Role : string

  // @ManyToOne(() => Role, (role) => role.users)
  // role: Role;
}

