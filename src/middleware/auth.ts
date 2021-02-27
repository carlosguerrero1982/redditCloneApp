import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';


 const  auth = async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const token = req.cookies.token

        if(!token) throw new Error('invalid token')

        const {username}:any = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findOne({username})

        if(!user) throw new Error('not user')

        res.locals.user =user;

        return next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
           message:'Error'
        }) 
    }

}

export default auth