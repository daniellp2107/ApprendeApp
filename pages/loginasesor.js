import React, { useState} from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const AUTENTICAR_ASESOR_MUTATION = gql`
  mutation autenticarAsesor($input:AuthAsesorInput){
    autenticarAsesor(input:$input){
      token
    }
  }
`;

const QUERY = gql`
    query obtenerAsesores{
        obtenerAsesores{
            nombre
  }
}
`;

const LoginAsesor = () => {

    //estado para mensaje
  const [mensaje, guardarMensaje] = useState(null);

  //mutation para el nuevo assesor
  const [autenticarAsesor] = useMutation(AUTENTICAR_ASESOR_MUTATION);
  const {data}= useQuery(QUERY);
  // console.log(data);

  //router 
  const router = useRouter();

  const formik = useFormik({
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
        .min(6,'La contraseña debe tener almenos 6 caracteres'),
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
    <Layout>
        <div className='w-auto flex justify-center'>
            
            <form onSubmit={formik.handleSubmit}>
                {mensaje && mostrarMensaje()}
              <div className='flex flex-col min-w-max w-24 p-5'>
                <h2 className='text-center text-white text-xl font-bold '> Asesor  </h2>  
                <label className='block text-white text-xl font-bold mb-2' htmlFor='email'>Correo</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                  id='email'
                  type='email' 
                  placeholder='Escribe tu correo'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}/>
              </div>
              {formik.touched.email && formik.errors.email ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formik.errors.email}</p>
                  </div>
                ) : null}
              <div className='flex flex-col min-w-max w-24 p-5'>
                <label className='block text-white text-xl font-bold mb-2' htmlFor='password'>Contraseña</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                  id='password'
                  type='password' 
                  placeholder='Escribe tu contraseña'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}/>
                <Link href="/nuevoasesor" className='bg-red-800 mt-5 rounded p-2'> ¡Registrate!</Link>
                <Link href="/recuperarcontraseña" className='bg-red-800 mt-5 rounded p-2'> ¿Olvidaste tu contraseña?</Link>
                {formik.touched.password && formik.errors.password ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formik.errors.password}</p>
                  </div>
                ) : null}
              </div>
              <input type='submit' className=' bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-400' value='Ingresar'/>
              <p>Formulario dos</p>
            </form>
          </div>
    </Layout>
  )
}

export default LoginAsesor;