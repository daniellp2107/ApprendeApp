import Image from 'next/image';
import React, {useState} from 'react';
import AlumnoLayout from '../components/AlumnoLayout';
import Abecedario from '../components/Letras/ABecedario'
import Carrusel from '../components/Letras/Carrusel';


const Letras = () => {
  const [letras,setLetras]=useState("");
  return (
    <AlumnoLayout>
      <div className='flex w-full justify-center'>
            <div className=''>
                <div className="w-auto ">
                    <div className=''>
                        <p className=" text-center text-white text-4xl "> Selecciona la letra que deseas ver</p>
                    </div>
                    <div className='flex md:flex-row sm:flex-col '>
                        <Abecedario 
                            className=''
                            onClickABC={
                                letra=>{
                                    console.log('Click en el boton', letra);
                                    setLetras(letra);
                                }
                        }/> 
                        <h3 className='w-full flex sm:justify-center items-center'>Imagen</h3>
                        {/* <Image 
                            src={'https://i.ibb.co/zxXFRHB/Fc-Oy-Vh-HWQAA-f-U.jpg'}
                            width={300}
                            height={300}
                        /> */}
                        
                    </div>
                </div>
                
            </div>
           
        

        </div>
    </AlumnoLayout>
    
  )
}

export default Letras;