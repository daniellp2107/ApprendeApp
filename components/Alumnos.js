import React from 'react';
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_ALUMNO = gql`
    mutation eliminarAlumno($id:ID){
        eliminarAlumno(id:$id)
    }
`;

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

const Alumnos = ({alumno}) => {
    //mutation para eliminar el alumno
    const [eliminarAlumno] = useMutation(ELIMINAR_ALUMNO, {
        update(cache){
            //Obtener una copia del objeto en cache
            const {obtenerAlumnos_Asesor} = cache.readQuery({query:OBTENER_ALUMNOS_ASESOR});

            //resscribir el cache
            cache.writeQuery({
                query:OBTENER_ALUMNOS_ASESOR,
                data:{
                    obtenerAlumnos_Asesor:obtenerAlumnos_Asesor.filter(clienteActual => clienteActual.id !== id)
                }
            });
        }
    });

    const {id, nombre, apellido} = alumno;

    //eliminar un cliente
    const confirmarEliminarAlumno =(id)=>{
        

        Swal.fire({
            title: 'Desea eliminar este alumno?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ¡Eliminar',
            cancelButtonText:'No, Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //Eliminar por id
                    const {data} = await eliminarAlumno({
                        variables:{
                            id:id
                        }
                    });
                    // console.log(data);
                    console.log('Eliminando ', id);
                    Swal.fire(
                        '¡Eliminado!',
                        data.eliminarAlumno,
                        'success'
                      )
                } catch (error) {
                    console.log(error);
                };
            };
          });
    };

    const editarCliente =(id)=>{
        Router.push({
            pathname:'/editarCliente/id',
            query:{id}
        });

    }
    
    return (
        <tr key={alumno.id}>
            <td className=' px-4 py-2 text-white'>{nombre} {apellido}</td> 
            <td className=' px-4 py-2 text-white'>
                <button>
                    Informacion
                </button>
            </td>
            <td className=' px-4 py-2 text-white'>
                <button className=' px-4 py-2 flex justify-center items-center bg-red-800 py-2 px-4 text-xs w-full rounded uppercase font-bold'
                    onClick={()=>confirmarEliminarAlumno(id)}
                >
                    Eliminar

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2"> <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
            </td>
            <td className=' px-4 py-2 text-white'>
                <button className=' px-4 py-2 flex justify-center items-center bg-green-800 py-2 px-4 text-xs w-full rounded uppercase font-bold'
                    onClick={()=>editarCliente(id)}
                >
                    Editar

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>

                </button>
            </td>
        </tr>
    )
}

export default Alumnos