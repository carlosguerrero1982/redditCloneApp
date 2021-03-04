import './styles/globals.css';
import "tailwindcss/tailwind.css";
import Axios from 'axios'
import './styles/tailwind.css'
import { Fragment } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { freemem } from 'os';


Axios.defaults.baseURL = 'http://localhost:5000/api'
Axios.defaults.withCredentials = true


function MyApp({ Component, pageProps }) {

  const {pathname} = useRouter()

  const authRoutes= ['/register','/login']
  const authRoute= authRoutes.includes(pathname)

  return(

    <Fragment>

   {!authRoute && <Navbar />}

        <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
