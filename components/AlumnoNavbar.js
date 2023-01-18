import Link from 'next/link';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTERNER_ALUMNO = gql`
  query obtenerAlumnoID{
    obtenerAlumnoID{
        nombre
        apellido
        edad
        telefono
        nivel
        asesor
  }
}
`;

const Navbar = () => {

  const router = useRouter();
  const {data,loading,error} = useQuery(OBTERNER_ALUMNO,);
  
  if(loading) return 'Cargando...';
  // console.log(data);
  // console.log(error);

  //si no hay datos
  if(!data){
    router.push('/inicio');
    return null;
  }   

  const {obtenerAlumnoID} = data;

  const cerrarSesion =()=>{
    localStorage.removeItem('token');
    router.push('/opcionusuario');
  }

  return (
      <>
        <nav className='bg-blue-800 flex list-none justify-between items-center py-4'>
              <p className='text-2xl font-bold text-gray-100'>Aprende-APP</p>
 
              <div className='flex  pr-5'>
                <li>
                  <p className='bg-blue-500 w-full sm:auto font-bold upperrcase text-xs rounded py-2 px-2 text-white shadow-md'>{obtenerAlumnoID ? obtenerAlumnoID.nombre : 'Usuario'}</p>
                </li>
                <li>
                    <button className='bg-blue-500 w-full sm:auto font-bold upperrcase text-xs rounded py-2 px-2 text-white shadow-md'  onClick={()=>cerrarSesion()}>Salir</button>
                </li>
                <li>
                    <button className='bg-blue-500 w-full sm:auto font-bold upperrcase text-xs rounded py-2 px-2 text-white shadow-md'  
                        onClick={()=>router.push('/inicioalumno')}>Inicio</button>
                </li>
              </div>
            </nav>
      </>
    
  );
};

export default Navbar;