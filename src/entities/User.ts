import { IsEmail, Length, Min } from "class-validator";
import {Entity as TOEntity, Column, Index, BeforeInsert, OneToMany} from "typeorm";
import bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer'
import Entity from './Entity';
import Post from "./Post";

@TOEntity('users')
export default class User extends Entity {

    constructor(user:Partial<User>){
        super()
        Object.assign(this,user)
      

    }


    @Index()
    @Column({unique:true})
    @IsEmail(undefined,{message:'must be a valid email'})
    @Length(1, 255,{message:"email is empty"})    
    email: string;

    @Index()
    @Length(3, 255,{message:"al menos 3 letras chaval"})
    @Column({unique:true})
    username: string;

    @Exclude()
    @Column()
    @Length(3, 255,{message:"al menos 6 caracteres chaval"})

    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @BeforeInsert()
    async haspassword(){
        this.password = await bcrypt.hash(this.password,6)
    }

}
