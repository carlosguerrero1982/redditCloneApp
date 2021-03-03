import Head from 'next/head'
import React, { FormEvent } from 'react'
import Link from 'next/link'
import {useState} from 'react'
import Axios from 'axios';
import InputGroup from '../components/InputGroup'
import {useRouter} from 'next/router'

export default function Login() {



const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState<any>([]);

const router = useRouter()

const submitForm=async(e:FormEvent)=>{

  e.preventDefault()

  
  try {
    const res=await Axios.post('/auth/login',{
      password,username
    })
  console.log(res.data);
  
  router.push('/')

  } catch (error) {
    setErrors(error.response.data)
    console.log(error.response.data);
  }
}


  return (
    <div className="flex">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}
      ></div>

      <div className="flex flex-col justify-center pl-3">
        <h1 className="px-3 mb-2 text-lg font-medium">LOGIN</h1>
        <p className="mb-10 text-xs">By continuing you agree terms and conditions</p>
        <form onSubmit={submitForm}>
          

          <InputGroup className="mb-2" type="text" value={username} setValue={setUsername} placeholder="Username" errors={errors.username} />
          <InputGroup className="mb-4" type="password" value={password} setValue={setPassword} placeholder="Password" errors={errors.password} />

      

         

      <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded ">LOGIN</button>
        </form>
        
        <small>
          new to reddit
          <Link href='/register'>
            <a className="ml-1 text-blue-500 uppercase">SIGN UP</a>
          </Link>
        </small>
      


      </div>

      

      </div>
   
    
  )
}
