import { Request, Response, Router } from "express";
import { User } from "../entities/User";
import {validate,isEmpty} from 'class-validator'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';


const register= async(req:Request,res:Response)=>{

    const{email,username,password}=req.body;
    try{
    

        let errors:any = {}

        const emailUser = await User.findOne({email});
        const usernameUser = await User.findOne({username});
        if(emailUser) errors.email='Email already taken';
        if(usernameUser) errors.username='User already taken';
            
        if(Object.keys(errors).length>0){
            
            return res.status(400).json(errors)
            
        }
        const user = new User({email,username,password});

        errors = await validate(user);
        
        if(errors.length>0)return res.status(400).json({errors})
        
        await user.save();

        return res.json(user);
    

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Error'
        })
    }
}


const login= async(req:Request,res:Response)=>{
    
    let errors:any={};

    const{username,password}=req.body;

    try {
        if(isEmpty(username)) errors.username='Username is empty';
        if(isEmpty(password)) errors.password='Password is empty';

        if(Object.keys(errors).length>0){

            return res.status(400).json(errors);
        }

        const user = await User.findOne({username});
        if(!user) return res.status(404).json({error:'user not found'})

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch){
            return res.status(401).json({password: 'password invalid'})
        }

        const token = jwt.sign({username},process.env.JWT_SECRET)
         res.set('Set-Cookie',cookie.serialize('token',token,{
             httpOnly:true,
             secure:process.env.NODE_ENV==='production',
             sameSite:'strict',
             maxAge:3600,
             path:'/'
         }));

         return res.json({user})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
           message:'Error'
        }) 
    }
}

const me= async(req:Request,res:Response)=>{

    try {
        const token = req.cookies.token

        if(!token) throw new Error('invalid token')

        const {username}:any = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findOne({username})

        if(!user) throw new Error('not user')

        return res.json(user)

    } catch (error) {
        console.log(error);
        return res.status(401).json({
           message:'Error'
        }) 
    }
}



const router = Router();

router.post('/register',register);
router.post('/login',login);
router.get('/me',me);

export default router;