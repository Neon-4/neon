import Image from 'next/image'
import { Inter } from 'next/font/google'
import Welcome from '@/components/Welcome'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
<div>
  {/* <Welcome/> */}
  <Navbar/>
</div>
  )
}
