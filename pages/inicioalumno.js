import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import AlumnoLayout from '../components/AlumnoLayout';

const InicioAlumno = () => {


  return (
    <AlumnoLayout>
      <div className='w-full flex justify-center text-white'>
        <div className=' w-auto flex items-center ' >
          <div className='w-auto flex flex-col'>
              <div className='p-4 m-2 flex justify-between'>
                <Link href='/letras' className='w-2/3 bg-gray-500 '> Letras </Link>
                <button className='bg-gray-800'>Btn-Voz</button>
                <button className=''></button>
              </div>
              <div className='p-4 m-2 flex justify-between '>
                <Link href='/palabras' className='w-2/3 bg-gray-500 '>Palabras</Link>
                <button className=' w-auto'>Btn-Voz</button>
              </div>
              <div className='p-4 m-2 flex justify-between '>
              <Link href='/ejerciciopalabras' className='w-2/3 bg-gray-500 '>Ejercicio Palabras</Link>
                <button className=' '>Btn-Voz</button>
              </div>
              <div className='p-4 m-2 flex justify-between '>
                <button className='w-2/3 bg-gray-500'>Ejercicios Silabas</button>
                <button className=' '>Btn-Voz</button>
              </div>
              <div className='p-4 m-2 flex justify-between '>
                <button className='w-2/3 bg-gray-500'>Escritura</button>
                <button className=' '>Btn-Voz</button>
              </div>
              <div className='p-4 m-2 flex justify-between '>
                <button className='w-2/3 bg-gray-500'>Chat</button>
                <button className=' '>Btn-Voz</button>
              
            </div>
          </div>
        </div>
        
      </div>
    </AlumnoLayout>
    
  )
}

export default InicioAlumno