import Link from 'next/link';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTERNER_ASESOR = gql`
  query obtenerAsesor{
    obtenerAsesor {
      nombre
  }
}
`;

const Navbar = () => {

  const router = useRouter();
  const {data,loading,error} = useQuery(OBTERNER_ASESOR);
  const nombreAsesor = "Usuario";
  
  if(loading) return 'Cargando...';
  // console.log(data);
  // console.log(error);

  //si no hay datos
  if(!data){
    router.push('/inicio');
    return null;
  }   

  const cerrarSesion =()=>{
    localStorage.removeItem('token');

    router.push('/inicio');
  }

  return (
      <>
        <nav className='bg-blue-800 flex list-none justify-between items-center py-4'>
              <p className='text-2xl font-bold text-gray-100' onClick={()=>router.push('/inicio')} >Aprende-APP</p>
 
              <div className='flex  pr-5'>
                <li>
                  <p className='bg-blue-500 w-full sm:auto font-bold upperrcase text-xs rounded py-2 px-2 text-white shadow-md'>{!data.obtenerAsesor ? nombreAsesor : data.obtenerAsesor.nombre}</p>
                </li>
                <li>
                    <button className='bg-blue-500 w-full sm:auto font-bold upperrcase text-xs rounded py-2 px-2 text-white shadow-md'  onClick={()=>cerrarSesion()}>Salir</button>
                </li>
              </div>
            </nav>
      </>
    
  );
};

export default Navbar;