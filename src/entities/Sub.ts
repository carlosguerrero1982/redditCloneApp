
import Entity from './Entity';
import { Column, Entity as TOEntity, Index, JoinColumn, ManyToOne, BeforeInsert, OneToMany } from 'typeorm';
import User from './User';
import makeid, { slugify } from '../util/helpers';
import Post from './Post';
    

@TOEntity('subs')
export default class Sub extends Entity {

    constructor(subs:Partial<Sub>){
        super()
       Object.assign(this,subs)
      

    }

    @Index()
    @Column({unique:true})
    name:string

    @Column()
    title:string

    @Column({type:'text',nullable:true})
    description:string

    @Column({nullable:true})
    imageUrn:string

    @Column({nullable:true})
    bannerUrn:string
   
    @ManyToOne(() => User)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user: User;

    @OneToMany(()=> Post, post=>post.sub)
    posts:Post[]

}
