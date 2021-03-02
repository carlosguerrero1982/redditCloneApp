import Entity from './Entity';
import {BeforeInsert, Column, Entity as TOEntity, JoinColumn, ManyToOne} from 'typeorm'
import User from './User';
import Post from './Post';
import makeid from '../util/helpers';

@TOEntity()
export default class Comment extends Entity{

    constructor(comment:Partial<Comment>){
        super()
        Object.assign(this,comment)
    }

    @Column()
    identifier:string

    @Column()
    body:string

    @Column()
    username:string

    @ManyToOne(() => User)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user: User;

    @ManyToOne(() => Post, (post)=>post.comments,{nullable:false})
    post: Post;

    @BeforeInsert()
    makeID (){
        this.identifier=makeid(8)
    }


}