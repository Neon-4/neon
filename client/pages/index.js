import Image from 'next/image'
import { Inter } from 'next/font/google'
import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'
import Login from '@/components/Login'
import {RecoilRoot} from "recoil";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <RecoilRoot>
        <Navbar/>
        <Landing/>
        <Login />
      </RecoilRoot>
    </div>
  )
}
