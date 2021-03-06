import Head from 'next/head'
import React, { FormEvent } from 'react'
import Link from 'next/link'
import {useState} from 'react'
import Axios from 'axios';
import InputGroup from '../components/InputGroup'
import {useRouter} from 'next/router'

export default function Register() {



const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [agreement, setAgreement] = useState(false);
const [errors, setErrors] = useState<any>([]);

const router = useRouter()

const submitForm=async(e:FormEvent)=>{

  e.preventDefault()

  if(!agreement){
    setErrors({...errors,agreement:'Must agree the terms'})
    return
  }

  try {
    const res=await Axios.post('/auth/register',{
      email,password,username
    })
  console.log(res.data);
  
  router.push('/login')

  } catch (error) {
    console.log(error);
    setErrors(error.response.data)
  }
}


  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}
      ></div>

      <div className="flex flex-col justify-center pl-3">
        <h1 className="px-3 mb-2 text-lg font-medium">SIGN UP</h1>
        <p className="mb-10 text-xs">By continuing you agree terms and conditions</p>
        <form onSubmit={submitForm}>
          <div className="mb-6">
            < input type="checkbox" id="agreement" className="mr-1 cursor-pointer" checked={agreement} onChange={(e)=>{setAgreement(e.target.checked)}} />
            <label className="text-xs cursor-pointer" htmlFor="agreement">I agree  to get email about Reddit</label>
            <small className="block font-medium text-red-500">{errors.agreement}</small>
          </div>

          <InputGroup className="mb-2" type="email" value={email} setValue={setEmail} placeholder="Email" errors={errors.email} />
          <InputGroup className="mb-2" type="text" value={username} setValue={setUsername} placeholder="Username" errors={errors.username} />
          <InputGroup className="mb-4" type="password" value={password} setValue={setPassword} placeholder="Password" errors={errors.password} />




         

      <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded ">SIGN UP</button>
        </form>
        
        <small>
          Already for reddit?
          <Link href='/'>
            <a className="ml-1 text-blue-500 uppercase">LOG IN</a>
          </Link>
        </small>
      


      </div>

      

      </div>
   
    
  )
}
