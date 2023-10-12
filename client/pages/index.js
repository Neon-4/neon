import Image from 'next/image'
import { Inter } from 'next/font/google'
import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'
import {RecoilRoot} from "recoil";
import Login from '@/components/Login';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
        <Navbar/>
        {/* <Landing/> */}
        <Login/>
    </div>
  )
}
