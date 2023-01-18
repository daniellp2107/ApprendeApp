import Link from 'next/link';
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout >
      <div className='bg-blue-800 flex justify-between max-auto min-w-min'>
        <div className='w-1/4 m-5 ' >
          <p className='p-5 text-2xl font-bold text-white'>Aprende con actividades y ejercicioshechos para nuestros educandos de mayor edad.</p>
        </div>
        <div className='w-2/4 m-10 text-2xl font-bold text-white' >
          <div >
            <p>Con nuestros contenidos hechos para nuestros adultos, mejoramos la calidad de su aprendizaje ayudándolos a conocer y usar las nuevas tecnologías. Integramos sistemas inteligentes para mejorar la experiencia de nuestros educandos.</p>
          </div>
          <div className='mt-5 text-center'> 
            
            <Link href="/opcionusuario" className='text-center bg-red-800 font-bold p-2 rounded' >¡Comienza Ya!</Link>
            
          </div>
          <div className='p-5'>
            <p className=''>Logo</p>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};
