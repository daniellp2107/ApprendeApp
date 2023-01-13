import Link from 'next/link';
import Layout from '../components/Layout'

import React from 'react'

const OpcionUsuario = () => {
  return (
    <Layout >
      <div className='bg-blue-800 flex justify-between max-auto min-w-min'>
        <div className='w-1/3 m-10 text-2xl font-bold text-white' >
          <div >
            <p className='text-center'>Si eres alumno da click aqui abajo en el enlace</p>
          </div>
          <div className='mt-5 text-center'> 
            
            <Link href="/loginalumno" className='text-center bg-red-800 font-bold p-2 rounded' >¡Comienza Ya!</Link>
            
          </div>
          <div className='p-5'>
            <p className=''>Logo</p>
          </div>
          
        </div>
        <div className='w-1/3 m-10 text-2xl font-bold text-white' >
          <div >
            <p className='text-center'>Si eres asesor, da click aqui abajo en el enlace</p>
          </div>
          <div className='mt-5 text-center'> 
            
            <Link href="/loginasesor" className='text-center bg-red-800 font-bold p-2 rounded' >¡Comienza Ya!</Link>
            
          </div>
          <div className='p-5'>
            <p className=''>Logo</p>
          </div>
          
        </div>
        <div className='w-1/3 m-10 text-2xl font-bold text-white' >
          <div >
            <p className='text-center'>Si eres un visitante, da click aqui abajo en el enlace</p>
          </div>
          <div className='mt-5 text-center'> 
            
            <Link href="/inicio" className='text-center bg-red-800 font-bold p-2 rounded' >¡Comienza Ya!</Link>
            
          </div>
          <div className='p-5'>
            <p className=''>Logo</p>
          </div>
          
        </div>
      </div>
    </Layout>
  )
}

export default OpcionUsuario;
