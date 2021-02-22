import { IsEmail, isEmail, Length, Min } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert, Exclusion} from "typeorm";
import bcrypt from 'bcrypt';
import {classToPlain,Exclude} from 'class-transformer'

@Entity('users')
export class User extends BaseEntity {

    constructor(user:Partial<User>){
        super()
        Object.assign(this,user)
      

    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    
    @Index()
    @Column({unique:true})
    @IsEmail()
    email: string;

    @Index()
    @Length(3, 255,{message:"al menos 3 letras chaval"})
    @Column({unique:true})
    username: string;

    @Exclude()
    @Column()
    @Length(6,255)
    password: string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @BeforeInsert()
    async haspassword(){
        this.password = await bcrypt.hash(this.password,6)
    }

    toJSON(){
        return classToPlain(this)
    }
}
