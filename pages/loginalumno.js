import React, { useState} from 'react';
// import './inicio.css';
// import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const AUTENTICAR_ALUMNO_MUTATION = gql`
  mutation autenticarAlumno($input:AuthAlumnoInput){
    autenticarAlumno(input:$input){
      token
    }
  }
`;

const LoginAlumno = () => {

  //estado para mensaje
  const [mensaje, guardarMensaje] = useState(null);

  //mutation para el nuevo assesor
  const [autenticarAlumno] = useMutation(AUTENTICAR_ALUMNO_MUTATION);

  //router 
  const router = useRouter();

  const formik = useFormik({
    initialValues:{
      nombre:'',
      telefono:'',
    },
    validationSchema:Yup.object({
      nombre:Yup.string()
        .required('El nombre es necesario'),
      telefono:Yup.string()
        .required('Este campo es necesario'),
        
    }),
    onSubmit: async valores =>{
      console.log('Enviando');
      console.log(valores);
      const {nombre, telefono} = valores;
      try {
        const {data} = await autenticarAlumno({
          variables:{
            input:{
              nombre,
              telefono
            }
          }
        });
        console.log(data);
        guardarMensaje('Autenticando...');

        //redireccionar hacia clientes
        setTimeout(()=>{
          guardarMensaje(null);
          router.push('/');
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
      <div className='bg-black text-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
        <div className='w-auto flex justify-center'>
        <form className='rounded' onSubmit={formik.handleSubmit}>
            {mensaje && mostrarMensaje()}
              <div className='flex flex-col min-w-max w-24 p-5'>
                <h2 className='text-center text-white text-xl font-bold '> Alumno  </h2>
                <label className='block text-white text-xl font-bold mb-2' htmlFor='nombre'>Nombre</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='nombre'
                  type='text' 
                  placeholder='Escribe tu nombre'
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}/>
              </div>
              {formik.touched.nombre && formik.errors.nombre ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formik.errors.nombre}</p>
                  </div>
                ) : null}
              <div className='flex flex-col min-w-max w-24 p-5'>
                <label className='block text-white text-xl font-bold mb-2' htmlFor='telefono'>Telefono</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                  id='telefono'
                  type='text' 
                  placeholder='Escribe tu telefono'
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}/>
                {/* <Link href="/nuevoasesor" className='bg-red-800 mt-5 rounded p-2'> ¡Ingresa!</Link> */}
              </div>
              {formik.touched.telefono && formik.errors.telefono ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formik.errors.nombre}</p>
                  </div>
                ) : null}
              <input type='submit' className=' bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-400' value='Ingresar'/>
              <p>Formulario Uno</p>
            </form>
        </div>
    </Layout>
  )
}

export default LoginAlumno;