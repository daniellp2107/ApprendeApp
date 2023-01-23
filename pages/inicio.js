import React, { useState} from 'react';
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

const AUTENTICAR_ASESOR_MUTATION = gql`
  mutation autenticarAsesor($input:AuthAsesorInput){
    autenticarAsesor(input:$input){
      token
    }
  }
`;

function Inicio() {

  //estado para mensaje
  const [mensaje, guardarMensaje] = useState(null);

  //mutation para el nuevo assesor
  const [autenticarAlumno] = useMutation(AUTENTICAR_ALUMNO_MUTATION);
  const [autenticarAsesor] = useMutation(AUTENTICAR_ASESOR_MUTATION);

  //router 
  const router = useRouter();

  const formikAlumno = useFormik({
    initialValues:{
      nombre:'',
      apellido:'',
    },
    validationSchema:Yup.object({
      nombre:Yup.string()
        .required('El nombre es necesario'),
      apellido:Yup.string()
        .required('Este campo es necesario'),
        
    }),
    onSubmit: async valores =>{
      // console.log('Enviando');
      // console.log(valores);
      const {nombre, apellido} = valores;
      try {
        const {data} = await autenticarAlumno({
          variables:{
            input:{
              nombre,
              apellido
            }
          }
        });
        // console.log(data);
        guardarMensaje('Autenticando...');

        //guardar el token en el localstorage
        const {token} = data.autenticarAlumno;
        localStorage.setItem('token', token);

        //redireccionar hacia pagina de alumno
        setTimeout(()=>{
          guardarMensaje(null);
          router.push('/inicioalumno');
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

  const formikAsesor = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:Yup.object({
      email:Yup.string()
      .email('El correo no es valido')
      .required('El correo es obligatorio'),
      password:Yup.string()
        .required('La contraseña no puede estar vacio')
        .min(6,'La contraseña debe tener almenos 6 caracteres')
        
    }),
    onSubmit: async valores =>{
      // console.log('Enviando');
      // console.log(valores);
      const {email, password} = valores;
      try {
        const {data} = await autenticarAsesor({
          variables:{
            input:{
              email,
              password
            }
          }
        });
        // console.log(data);
        guardarMensaje('Autenticando...');

        //guardar el token en el localstorage
        const {token} = data.autenticarAsesor;
        // console.log(token);
        localStorage.setItem('token', token);

        //redireccionar hacia pagina del asesor
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
      <div className='bg-black text-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <>
      <Layout>
        <h1 className='text-center text-2xl text-white font-bold pb-3'>Iniciar sesión</h1>
        {mensaje && mostrarMensaje()}
        <div className='flex justify-around flex-col sm:flex-col  md:flex-row lg:flex-row xl:flex-row'>
          <div className='w-auto flex justify-center'>
          
            <form className='rounded' onSubmit={formikAlumno.handleSubmit}>
              <div className='flex flex-col min-w-max w-24 p-5'>
                <h2 className='text-center text-white text-xl font-bold '> Alumno  </h2>
                <label className='block text-white text-xl font-bold mb-2' htmlFor='nombre'>Nombre</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='nombre'
                  type='text' 
                  placeholder='Escribe tu nombre'
                  value={formikAlumno.values.nombre}
                  onChange={formikAlumno.handleChange}
                  onBlur={formikAlumno.handleBlur}/>
              </div>
              {formikAlumno.touched.nombre && formikAlumno.errors.nombre ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formikAlumno.errors.nombre}</p>
                  </div>
                ) : null}
              <div className='flex flex-col min-w-max w-24 p-5'>
                <label className='block text-white text-xl font-bold mb-2' htmlFor='apellido'>Apellido</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                  id='apellido'
                  type='text' 
                  placeholder='Escribe tu telefono'
                  value={formikAlumno.values.apellido}
                  onChange={formikAlumno.handleChange}
                  onBlur={formikAlumno.handleBlur}/>
                {/* <Link href="/nuevoasesor" className='bg-red-800 mt-5 rounded p-2'> ¡Ingresa!</Link> */}
              </div>
              {formikAlumno.touched.apellido && formikAlumno.errors.apellido ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formikAlumno.errors.apellido}</p>
                  </div>
                ) : null}
              <input type='submit' className=' bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-400' value='Ingresar'/>
              <p>Formulario Uno</p>
            </form>
          </div>  
          <div className='w-auto flex justify-center'>
            <form onSubmit={formikAsesor.handleSubmit}>
              <div className='flex flex-col min-w-max w-24 p-5'>
                <h2 className='text-center text-white text-xl font-bold '> Asesor  </h2>  
                <label className='block text-white text-xl font-bold mb-2' htmlFor='email'>Correo</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                  id='email'
                  type='email' 
                  placeholder='Escribe tu correo'
                  value={formikAsesor.values.email}
                  onChange={formikAsesor.handleChange}
                  onBlur={formikAsesor.handleBlur}/>
              </div>
              {formikAsesor.touched.email && formikAsesor.errors.email ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formikAsesor.errors.email}</p>
                  </div>
                ) : null}
              <div className='flex flex-col min-w-max w-24 p-5'>
                <label className='block text-white text-xl font-bold mb-2' htmlFor='password'>Contraseña</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                  id='password'
                  type='password' 
                  placeholder='Escribe tu contraseña'
                  value={formikAsesor.values.password}
                  onChange={formikAsesor.handleChange}
                  onBlur={formikAsesor.handleBlur}/>
                <Link href="/nuevoasesor" className='bg-red-800 mt-5 rounded p-2'> ¡Registrate!</Link>
                <Link href="/recuperarcontraseña" className='bg-red-800 mt-5 rounded p-2'> ¿Olvidaste tu contraseña?</Link>
              </div>
              {formikAsesor.touched.password && formikAsesor.errors.password ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formikAsesor.errors.password}</p>
                  </div>
                ) : null}
              <input type='submit' className=' bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-400' value='Ingresar'/>
              <p>Formulario dos</p>
            </form>
          </div>
          <div className='w-auto flex justify-center'>
            <form>
              <div className='flex flex-col min-w-max w-24 p-5'>
                <h2 className='text-center text-white text-xl font-bold '> Visitante  </h2>  
                <label className='block text-white text-xl font-bold mb-2'>Nombre</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='nombre'
                  type='text' 
                  placeholder='Escribe tu nombre'/>
              </div>
              <div className='flex flex-col min-w-max w-24 p-5'>
                <label className='block text-white text-xl font-bold mb-2'>Edad</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='nombre'
                  type='text' 
                  placeholder='Escribe tu edad'/>
                <Link href="/nuevoasesor" className='bg-red-800 mt-5 rounded p-2'> ¡Date una vuleta!</Link>
              </div>
              <p>Formulario tres</p>
            </form>
          </div>
        </div>
      </Layout>
    </>
    
      
  )
}
  
export default Inicio;