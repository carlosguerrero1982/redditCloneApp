import './styles/globals.css';
import "tailwindcss/tailwind.css";
import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:5000/api'
Axios.defaults.withCredentials = true


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
