import React from 'react';
import Link from "next/link";
import Navbar from '@/components/Navbar';
import Landing from '@/components/Landing'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

  return (
    <div>
        <Navbar/>
        <Landing/>
        <Link href="/pages/products"></Link>
    </div>
  );
}
