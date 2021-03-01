import { Router, Request, Response } from 'express';
import User from '../entities/User';
import auth from '../middleware/auth';
import Sub from '../entities/Sub';
import {isEmpty} from 'class-validator'
import {getRepository} from 'typeorm'


const createSub =async(req:Request,res:Response)=>{

    const {name,title,description}=req.body;

    const user:User= res.locals.user;

    try {
        
        let errors:any={};
        if(isEmpty(name)) errors.name='name is empty';
        if(isEmpty(title)) errors.title='title is empty';
        if(isEmpty(description)) errors.description='description is empty';

        const sub = await getRepository(Sub)
            .createQueryBuilder('sub')
            .where('lower(sub.name)=:name', { name:name.toLowerCase() })
            .getOne()

            if(sub) errors.name='Sub exists'

            if(Object.keys(errors).length>0){
                throw new Error(errors)
            }

            
    
    } catch (error) {
        return res.status(400).json(error)
    }

    try {
        
        const sub = new Sub({name,description,title,user})
        await sub.save()
        return res.json(sub)

    } catch (error) {
          return res.status(400).json(error)
    }
}

const routersub = Router();


routersub.post('/',auth,createSub);

export default routersub;