import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import AlumnoNavbar from './AlumnoNavbar';

const AlumnoLayout = ({children}) => {

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Apprende APP</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className='bg-blue-800 min-h-screen'>
      {router.pathname === '/opcionusuario' || router.pathname === '/' || router.pathname === '/loginasesor' || router.pathname === '/loginalumno' ? null : <AlumnoNavbar />}  
        
        <main className='bg-blue-800 '>
          {children}
        </main>    
      </div>
    </>
  )
}

export default AlumnoLayout;