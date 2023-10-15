import Image from 'next/image'
import React, { useState } from 'react';
import { Inter } from 'next/font/google'
import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'
import Login from '@/components/Login';
import AllProducts from '@/components/products/allProducts';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
        <Navbar/>
        <Landing/>
        <AllProducts/>
        {/* <Login showLogin={showLogin} setShowLogin={setShowLogin} /> */}
    </div>
  )
}
