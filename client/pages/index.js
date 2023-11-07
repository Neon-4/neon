import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Navbar from '@/components/Navbar';
import Landing from '@/components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time with setTimeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Change the delay time as needed

    // Clear the timeout if the component is unmounted before the loading is completed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="h-8 w-8 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin"></div>
            <span className="text-blue-600">Loading...</span>
          </div>
        </div>

      ) : (
        <div>
          <Navbar />
          <Landing />
        </div>
      )}
    </div>
  );
}
