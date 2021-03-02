import { Response } from 'express';
import { Router, Request } from 'express';
import auth from '../middleware/auth'
import Post from '../entities/Post';
import Sub from '../entities/Sub';
import Comment from '../entities/Comment';
import { slugify } from '../util/helpers';
import User from '../entities/User';

const createPost =async (req:Request,res:Response)=>{

    const{title,body, sub}=req.body;

    const user= res.locals.user;

    if(title.trim()===''){    
        return res.status(400).json({
            message:'title not empty'
        })
    }

    try {

        const subRecord = await Sub.findOneOrFail({name:sub})
        const post = new Post({title,body,user,sub:subRecord})
        await post.save()
        return res.json(post);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:'Something wrong'
        })
    }
}


const getPosts=async (req:Request,res:Response)=>{

    try {
        const posts = await Post.find({
            order:{createdAt:'DESC'},
            relations:['sub','user','comments']
        })

        return res.json(posts)

    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

const getPost=async (req:Request,res:Response)=>{

    const {identifier,slug}=req.params

    try {
        const post = await Post.findOneOrFail({identifier,slug},{
            order:{createdAt:'DESC'},
            relations:['sub','user']
        })

        return res.json(post)

    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

const commentsOnPost=async (req:Request,res:Response)=>{

    const {identifier,slug}=req.params
    const {body} = req.body

    try {
        const post = await Post.findOneOrFail({identifier,slug})
        const comments = new Comment({
            body,
            user:res.locals.user,
            post
        })

        await comments.save()

        return res.status(200).json(comments)
            
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

const routerpost = Router();

routerpost.post('/',auth,createPost);
routerpost.get('/',auth,getPosts);
routerpost.get('/:identifier/:slug',auth,getPost);
routerpost.post('/:identifier/:slug/comments',auth,commentsOnPost);



export default routerpost;