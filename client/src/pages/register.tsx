import Head from 'next/head'
import styles from './styles/Home.module.css'

export default function Register() {

  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <div
        className="w-40 h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}
      ></div>

      <div className="flex flex-col justify-center pl-3">
        <h1 className="px-3 mb-2 text-lg">SIGN UP</h1>
        <p className="mb-10 text-xs">By continuing you agree terms and conditions</p>
      </div>

      </div>
   
    
  )
}
