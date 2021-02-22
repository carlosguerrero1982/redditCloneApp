import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from 'morgan';
import router from './routes/auth';
import trim from './middleware/trim'

const app =  express();

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)

app.get('/',(_,res)=>{

    res.send('hello')
})

app.use('/api/auth',router);

app.listen(5000,async()=>{
    console.log('server running on port 5000');

    try{

        await createConnection();
        console.log('database connected');
    }catch(error){
        console.log(error.message);
    }
})


  
