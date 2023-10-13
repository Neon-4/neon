import Image from 'next/image'
import React, { useState } from 'react';
import { Inter } from 'next/font/google'
import Landing from '@/components/Landing'
import Navbar from '@/components/Navbar'
import Login from '@/components/Login';

const inter = Inter({ subsets: ['latin'] })
import Landing from '@/components/Landing';
import Navbar from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
        <Navbar/>
        <Landing/>
        <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      <Navbar />
      <Landing />
    </div>
  );
}
