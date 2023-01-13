import Head from 'next/head';
import Script from 'next/script';
import React, { useState} from 'react';
import Layout from '../components/Layout';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Alumnos from '../components/Alumnos';

// const ALUMNOS = gql`
//     query obtenerAlumnos{
//         obtenerAlumnos{
//             nombre
//     }
// }
// `;

const OBTENER_ALUMNOS_ASESOR = gql`
  query obtenerAlumnos_Asesor{
    obtenerAlumnos_Asesor{
        id
        nombre
        apellido
        nivel
    }
  }
`;

const InicioAsesor = () => {
  const router = useRouter();
  //todos los alumnos
  const {  data, loading, error} =   useQuery(OBTENER_ALUMNOS_ASESOR);

  if (loading) return 'Cargando... ';

  //si no hay datos
  if(!data.obtenerAlumnos_Asesor){
    router.push('/inicio');
    return null;
  }
  // console.log(data);

  return (

    <div>
      <Head>
        <title>Apprende APP</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Layout>
        <h1 className='text-2xl text-white font-bold'>Alumnos</h1>
        <Link href="/nuevoalumno" className='bg-blue-500 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-blue-600 font-bold'>Nuevo Alumno</Link>
        <div className='w-full flex justify-center'>
          <table className='table-fixed shadow-md mt-10'>
            <thead className='bg-blue-800'>
              <tr className='text-white'>
                <th className='w-auto py-2'> Nombre </th>
                <th className='w-auto py-2'> Información </th>
                <th className='w-auto py-2'> Eliminar </th>
                <th className='w-auto py-2'> Editar </th>
              </tr>
            </thead>
            <tbody className='bg-blue-700'>
              {data.obtenerAlumnos_Asesor.map(alumno=>(
                <Alumnos key={alumno.id} alumno={alumno}/>
              ))}
              <tr>
              </tr>
            </tbody>
          </table>
        </div>
        
      </Layout>

    </div>
  )
}

export default InicioAsesor;