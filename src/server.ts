import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from 'morgan';
import router from './routes/auth';
import routerpost from './routes/post';
import routersub from './routes/subs';
import trim from './middleware/trim'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'



dotenv.config()

const app =  express();

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())


app.get('/',(_,res)=>{

  return res.send('WELCOME');
    
})

app.use('/api/auth',router);
app.use('/api/post',routerpost);
app.use('/api/subs',routersub);



app.listen(process.env.PORT,async()=>{
    console.log('server running on port 5000');

    try{

        await createConnection();
        console.log('database connected');
    }catch(error){
        console.log(error.message);
    }
})


  
