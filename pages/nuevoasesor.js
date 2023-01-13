import React, {useState} from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useQuery,gql,useMutation } from '@apollo/client';
import { QueryInfo } from '@apollo/client/core/QueryInfo';

// const QUERY = gql`
//   query obtenerAsesores{
//     obtenerAsesores{
//       nombre
//       apellido
//     }
//   }
// `;

const NUEVO_ASESOR = gql`
  mutation nuevoAsesor($input:AsesorInput) {
    nuevoAsesor(input: $input){
      nombre
      apellido
      email
      ciudad
    }
  }
`;

const NuevoAsesor = () => {
  //Asesores
  // const {data,loading,error} = useQuery(QUERY);
  // console.log(data);

  //mutation para el nuevo assesor
  const [nuevoAsesor] = useMutation(NUEVO_ASESOR);

  //state para el mensaje
  const [mensaje, guardarMensaje] = useState(null);

  //router
  const router = useRouter();
  
  //validadcion del formulario
  const formik = useFormik({
    initialValues:{
      nombre:'',
      apellido:'',
      email:'',
      ciudad:'',
      password:'',
    },validationSchema:Yup.object({
      nombre:Yup.string()
        .required('El nombre es obligatorio'),
      apellido:Yup.string()
        .required('El apellido es obligatorio'),
      ciudad:Yup.string()
        .required('La ciudad es obligatorio'),
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

      const {nombre, apellido, ciudad, email, password} = valores;
      try {
        const {data} = await nuevoAsesor({
          variables:{
            input:{
              nombre,
              apellido,
              ciudad,
              email,
              password
            }
          }
        });
        // console.log(data);
        guardarMensaje(`Se crep correctamente el Usuario: ${data.nuevoAsesor.nombre}`);
        setTimeout(()=>{
          guardarMensaje(null);
          router.push('/inicio')

        },3000);
      } catch (error) {
        // console.log(data);
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
        <div>
          {mensaje && mostrarMensaje()} 
          <div className='flex text-center justify-center w-auto '>
            <form onSubmit={formik.handleSubmit}>
              <div className='flex flex-col min-w-max w-24 p-5'>
                <h2 className='text-center text-white text-xl font-bold pb-5'> Ingresa tus datos  </h2>
                <label className='block text-white text-xl font-bold mb-2' htmlFor='nombre'>Nombre</label >
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
                <label className='block text-white text-xl font-bold mb-2' htmlFor='apellido'>Apellido</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='apellido'
                  type='text' 
                  placeholder='Escribe tu apellido'
                  value={formik.values.apellido}
                  onChange={formik.handleChange}/>
              </div>
              {formik.touched.apellido && formik.errors.apellido ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formik.errors.apellido}</p>
                  </div>
                ) : null}
              <div className='flex flex-col min-w-max w-24 p-5'>
                <label className='block text-white text-xl font-bold mb-2' htmlFor='ciudad'>Ciudad</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='ciudad'
                  type='text' 
                  placeholder='Nombre de tu ciudad'
                  value={formik.values.ciudad}
                  onChange={formik.handleChange}/>
              </div>
              {formik.touched.ciudad && formik.errors.ciudad ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formik.errors.ciudad}</p>
                  </div>
                ) : null}

              <div className='flex flex-col min-w-max w-24 p-5'>
                <label className='block text-white text-xl font-bold mb-2' htmlFor='email'>Correo</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email' 
                  placeholder='Escribe tu correo'
                  value={formik.values.email}
                  onChange={formik.handleChange}/>
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
                  placeholder='Escribe una contraseña'
                  value={formik.values.password}
                  onChange={formik.handleChange}/>
              </div>
              {formik.touched.password && formik.errors.password ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'> Error</p>
                    <p> {formik.errors.password}</p>
                  </div>
                ) : null}
              <input type='submit' className=' bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-400' value='Crear Nueva Cuenta'/>
              <p>Formulario Asesor</p>
            </form>
          </div>
        </div>
    </Layout>
  );
};

export default NuevoAsesor;