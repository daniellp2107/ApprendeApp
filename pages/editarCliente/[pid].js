import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import Layout from '../../components/Layout';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_ALUMNO = gql`
    query obtenerAlumno($id:ID){
        obtenerAlumno(id:$id){
            id
            nombre
            apellido
            edad
            telefono
            nivel
        }
    }
`;

const ACTUALIZAR_ALUMNO = gql`
    mutation actualizarAlumno($id:ID!,$input:AlumnoInput){
        actualizarAlumno(id:$id,input:$input){
            id
            nombre
            apellido
            edad
            telefono
            nivel
        }
    }
`;

const EditarCliente = () => {
    //obtener id actual
    const router = useRouter();
    const {query:{id}} = router;
    // console.log(id);
    
    //Consultar para obtener cliente
    const {data, loading, error} = useQuery(OBTENER_ALUMNO,{
        variables:{
            id
        }
    });

    //Mutaion para actualizar alumno
    const [actualizarAlumno] = useMutation(ACTUALIZAR_ALUMNO);

    //schema de validacion
    const schemaValidacion = Yup.object({
        nombre:Yup.string()
          .required('El nombre es necesario'),
        apellido:Yup.string()
          .required('El apellido es necesario'),
        edad:Yup.number()
          .required('Es necesario este campo')
          .positive('La edad minima es de 3')
          .integer('Indique su edad')
          .max(100, 'La edad maxima es de 100')
          .min(15, 'La edad minima es de 3'),
        telefono:Yup.string()
          .required('Este campo es necesario')
          .max(10,'Se necesitan 10 numeros')
          .min(10,'Se necesitan 10 numeros'),
        nivel:Yup.number()
          .required('Este campo es necesario')
          .positive('Tiene que ser mayor a 1')
          .integer('Indique el nivel')
          .max(15, 'El nivel máximo es de 15')
          .min(1, 'El nivel mínimo es de 1'),
        
        })

    if(loading) return 'Cargando...'
    // console.log(data);
    const {obtenerAlumno} = data;

    //Modificar el alumno en la base de datos
    const actualizarInfoAlumno = async (valores)=>{
       try {

            const {nombre,apellido,edad,telefono,nivel} = valores;

            const {data} = await actualizarAlumno({
                variables:{
                    id,
                    input:{
                        nombre,
                        apellido,
                        edad,
                        telefono,
                        nivel,
                    }
                
                }
            });
            //Alerta
            Swal.fire(
                '¡Actualizado!',
                'La información se actualizó correctamente',
                'success'
              )

            //Cambiar ruta
            router.push('/inicioasesor');
        } catch (error) {
            
        }
        

    }

  return (
    <Layout>
        <h1 className='text-2xl text-center font-bold text-white'>Editar alumno</h1>

        <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
                <Formik
                    enableReinitialize
                    validationSchema={schemaValidacion}
                    initialValues={obtenerAlumno}
                    onSubmit={(valores)=>{
                        // console.log('Enviando...');
                        actualizarInfoAlumno(valores);
                    }}
                >
                    {props =>{
                        // console.log(props);
                        return(
                            <form className='bg-blue-500 shadow-md px-8 pt-6 pb-8 mb-4' 
                                onSubmit={props.handleSubmit}
                            >
                                <div className='mb-4'>
                                <label className='block text-white text-xl font-bold mb-2' htmlFor='nombre'>Nombre</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='nombre'
                                    type='text' 
                                    placeholder='Nombre alumno'
                                    value={props.values.nombre}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.touched.nombre && props.errors.nombre ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'> Error</p>
                                    <p> {props.errors.nombre}</p>
                                </div>
                                ) : null}
                                <div className='mb-4'>
                                <label className='block text-white text-xl font-bold mb-2' htmlFor='apellido'>Apellido</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='apellido'
                                    type='text' 
                                    placeholder='Apellido alumno'
                                    value={props.values.apellido}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.touched.apellido && props.errors.apellido ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'> Error</p>
                                    <p> {props.errors.apellido}</p>
                                </div>
                                ) : null}
                                <div className='mb-4'>
                                <label className='block text-white text-xl font-bold mb-2' htmlFor='edad'>Edad</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='edad'
                                    type='number' 
                                    placeholder='Nombre alumno'
                                    value={props.values.edad}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.touched.edad && props.errors.edad ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'> Error</p>
                                    <p> {props.errors.edad}</p>
                                </div>
                                ) : null}
                                <div className='mb-4'>
                                <label className='block text-white text-xl font-bold mb-2' htmlFor='telefono'>Telefono</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='telefono'
                                    type='text' 
                                    placeholder='Telefono'
                                    value={props.values.telefono}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.touched.telefono && props.errors.telefono ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'> Error</p>
                                    <p> {props.errors.telefono}</p>
                                </div>
                                ) : null}
                                <div className='mb-4'>
                                <label className='block text-white text-xl font-bold mb-2' htmlFor='nivel'>Nivel</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='nivel'
                                    type='number' 
                                    placeholder='Nivel'
                                    value={props.values.nivel}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.touched.nivel && props.errors.nivel ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'> Error</p>
                                    <p> {props.errors.nivel}</p>
                                </div>
                                ) : null}
                                <input type='submit' className=' bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-400' value='Actualizar'/>
                            </form>

                        )
                    }}


                </Formik>


            </div>
        </div>
    </Layout>
    
  )
}

export default EditarCliente;