import Image from 'next/image'
import { Inter } from 'next/font/google'
import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Navbar />
      <Landing/>
    </div>
  )
}
