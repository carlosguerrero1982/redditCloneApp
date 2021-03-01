import { Response } from 'express';
import { Router, Request } from 'express';
import auth from '../middleware/auth'
import Post from '../entities/Post';

const createPost =async (req:Request,res:Response)=>{

    const{title,body, sub}=req.body;

    const user= res.locals.user;

    if(title.trim()===''){    
        return res.status(400).json({
            message:'title not empty'
        })
    }

    try {
        const post = new Post({title,body,user,subName:sub})
        await post.save()
        return res.json(post);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:'Something wrong'
        })
    }
}


const routerpost = Router();

routerpost.post('/',auth,createPost);

export default routerpost;