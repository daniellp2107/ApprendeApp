import React,{useState} from 'react';
import AlumnoLayout from '../components/AlumnoLayout';
import ArregloSilabas from '../components/Palabras/ArregloSilabas';
import Silabas from '../components/Palabras/Silabas';

const Palabras = () => {
    const [arregloPalabra, setArregloPalabra] = useState([]);

    function agregarPalabra (silaba){
        let arreglo = arregloPalabra;

        if(!arreglo[0]){
            setArregloPalabra([silaba]);
        }else{
            arreglo = [...arreglo,silaba ];
            setArregloPalabra(arreglo);
        }

    }
  return (
    <AlumnoLayout>
        <div className="">
                <div className="">
                    <p className='text-center'>Escribe la letra que desees escuchar </p>
                </div>
            
                <div className="">
                    <Silabas 
                        onClickSilabas = {
                            silaba=>{
                                console.log('Click en el boton', silaba);
                                agregarPalabra(silaba);
                            }
                        }
                    />
                    <ArregloSilabas 
                        arregloPalabra = {arregloPalabra}
                        setArregloPalabra = {setArregloPalabra}
                    />
                </div>
            </div> 
    </AlumnoLayout>
    
  )
}

export default Palabras;