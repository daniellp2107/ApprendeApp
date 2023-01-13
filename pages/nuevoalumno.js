import React,{useState} from 'react'
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation,useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const NUEVO_ALUMNO = gql`
  mutation nuevoAlumno($input:AlumnoInput){
    nuevoAlumno(input:$input){
      id
      nombre
    }
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

const NuevoAlumno = () => {
  const router = useRouter();
  const [mensaje,guardarMensaje] = useState(null);
  const [nuevoAlumno] = useMutation(NUEVO_ALUMNO, {
    update(cache, {data:{nuevoAlumno}}){
      //Obtenemos el objeto de cache que deseamos actualizar
      const {obtenerAlumnos_Asesor} = cache.readQuery({query:OBTENER_ALUMNOS_ASESOR});

      //Resscribimos el cache
      cache.writeQuery({
        query:OBTENER_ALUMNOS_ASESOR,
        data:{
          obtenerAlumnos_Asesor: [...obtenerAlumnos_Asesor, nuevoAlumno]
        }
      })
    }
  });
  

  const formik = useFormik({
    initialValues:{
      nombre:'',
      telefono:'',
      edad:15,
      telefono:'',
      nivel:1
    },
    validationSchema:Yup.object({
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
      
      }),
    onSubmit: async valores =>{
      // console.log('Enviando');
      // console.log(valores);
      const {nombre, apellido, edad, telefono, nivel} = valores;
      try {
        const {data} = await nuevoAlumno({
          variables:{
            input:{
              nombre,
              apellido,
              edad,
              telefono,
              nivel
            }
          }
        });
        // console.log(data);
        guardarMensaje('Guardando nuevo alumno...');

        //redireccionar hacia pagina de alumno
        setTimeout(()=>{
          guardarMensaje(null);
          router.push('/inicioasesor');
        },3000)

      } catch (error) {
        guardarMensaje(error.message.replace('GraphQL error', ''));
        console.log(error.message);
        setTimeout(() => {
          guardarMensaje(null);
        }, 3000);
        
      }
    }

  });

  const mostrarMensaje =()=>{
    return(
      <div className='bg-black py-2 px-3 w-full my-3 max-w-sm text-center mx-auto text-white'>
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout >
      <h1 className='text-2xl text-center font-bold text-white'>NuevoAlumno</h1>
      {mensaje && mostrarMensaje()}
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-blue-500 shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label className='block text-white text-xl font-bold mb-2' htmlFor='nombre'>Nombre</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='nombre'
                type='text' 
                placeholder='Nombre alumno'
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'> Error</p>
                <p> {formik.errors.nombre}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label className='block text-white text-xl font-bold mb-2' htmlFor='apellido'>Apellido</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='apellido'
                type='text' 
                placeholder='Apellido alumno'
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
            </div>
            {formik.touched.apellido && formik.errors.apellido ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'> Error</p>
                <p> {formik.errors.apellido}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label className='block text-white text-xl font-bold mb-2' htmlFor='edad'>Edad</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='edad'
                type='number' 
                placeholder='Nombre alumno'
                value={formik.values.edad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
            </div>
            {formik.touched.edad && formik.errors.edad ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'> Error</p>
                <p> {formik.errors.edad}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label className='block text-white text-xl font-bold mb-2' htmlFor='telefono'>Telefono</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='telefono'
                type='text' 
                placeholder='Telefono'
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
            </div>
            {formik.touched.telefono && formik.errors.telefono ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'> Error</p>
                <p> {formik.errors.telefono}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label className='block text-white text-xl font-bold mb-2' htmlFor='nivel'>Nivel</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='nivel'
                type='number' 
                placeholder='Nivel'
                value={formik.values.nivel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
            </div>
            {formik.touched.nivel && formik.errors.nivel ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'> Error</p>
                <p> {formik.errors.nivel}</p>
              </div>
              ) : null}
            <input type='submit' className=' bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-400' value='Inscribir nuevo alumno'/>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NuevoAlumno;