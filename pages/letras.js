import React, {useState} from 'react';
import AlumnoLayout from '../components/AlumnoLayout';
import Abecedario from '../components/Letras/Abecedario';
import Carrusel from '../components/Letras/Carrusel';

const Letras = () => {
    
    const [letras,setLetras]=useState("");


    return (
        <AlumnoLayout>
            <div className='flex w-full justify-center'>
                <div className='w-auto'>
                    <div className="flex flex-col md:flex-wrap">
                        <div className=''>
                            <p className=" text-center text-white text-4xl "> Selecciona la letra que deseas ver</p>
                        </div>
                        <div className='flex flex-wrap'>
                            <div className='w-full flex justify-center'>
                                <Abecedario 
                                    className=''
                                    onClickABC={
                                        letra=>{
                                            console.log('Click en el boton', letra);
                                            setLetras(letra);
                                            
                                        }
                                }/>
                            </div>
                            <div className='mt-5 w-screen '>
                                <div className='w-auto'>
                                    <Carrusel letra = {letras}/> 
                                </div>                                  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AlumnoLayout>
    
    )
}

export default Letras;