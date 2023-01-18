import React,{useState} from 'react';
import AlumnoLayout from '../components/AlumnoLayout';
import { nuevaSilaba } from '../components/EjercicioPalabras/nuevasilaba';
import MostrarSilabas from '../components/EjercicioPalabras/MostrarSilaba';

const EjercicioPalabras = () => {
    let auxiliar;
    let arreglo = [];
    let palabras = nuevaSilaba('Huitzilopochtli');
    const {silabas} = palabras;
    console.log(silabas);
    silabas.forEach((silaba)=>{
        auxiliar = Object.values(silaba);
        console.log(auxiliar);
        arreglo = [...arreglo, auxiliar[1] ]
    })
  return (
    <AlumnoLayout>
        <div className='w-full flex justify-center border '>
            <div className='border w-auto'>
                <MostrarSilabas arreglo = {arreglo}/>
            </div>
            
        </div>
        
    </AlumnoLayout>
    
  )
}

export default EjercicioPalabras;