import { Request, Response, Router } from "express";
import  User  from "../entities/User";
import { validate, isEmpty } from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import auth from '../middleware/auth';



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
        
        if(errors.length>0){

            let mappedErrors={}
            errors.forEach(element => {
                const key=element.property
                const value=Object.values(element.constraints)
                mappedErrors[key]=value
            });
           return res.status(400).json(mappedErrors)

        }

        
    

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

const me= (_:Request,res:Response)=>{

  return res.json(res.locals.user)

}

const logout =(_:Request,res:Response)=>{

    try {
        
        res.set('Set-Cookie',cookie.serialize('token','',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',
            expires: new Date(0),
            path:'/'
        }));
        return res.status(500).json({
            message:'Borrado'
        })
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
router.get('/me',auth,me);
router.get('/logout',auth,logout);

export default router;