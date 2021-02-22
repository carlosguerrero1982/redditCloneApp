import { NextFunction, Request, Response } from 'express';


 const trim=(req:Request,res:Response,next:NextFunction)=>{

    const exceptions = ['username','email'];
    

    Object.keys(req.body).forEach(key=>{
        if(exceptions.includes(key) && typeof req.body[key]==='string'){
            req.body[key]= req.body[key].trim();
        }
    })

    next()
}

export default trim