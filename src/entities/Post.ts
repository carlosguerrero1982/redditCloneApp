
import Entity from './Entity';
import { Column, Entity as TOEntity, Index, JoinColumn, ManyToOne, BeforeInsert } from 'typeorm';
import User from './User';
import makeid, { slugify } from '../util/helpers';

@TOEntity('posts')
export default class Post extends Entity {

    constructor(post:Partial<Post>){
        super()
       Object.assign(this,post)
      

    }

   @Index()
   @Column()
    identifier:string

    @Column()
    title:string

    @Index()
    @Column()
    slug:string

    @Column({nullable:true, type:'text'})
    body:string

    @Column()
    subName:string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user: User;

    @BeforeInsert()
    makeIdSlug(){
        this.identifier=makeid(7)
        this.slug=slugify(this.title)
    }

}
