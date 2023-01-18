import React from 'react';

const ArregloSilabas = ({arregloPalabra, setArregloPalabra}) => {

    console.log(arregloPalabra);

    return (
        <div className="d-flex ">
            
            <p className='border-4 border-indigo-500/50 rounded-lg text-6xl flex inline text-white'>{arregloPalabra}</p>
            <div className='flex justify-center text-white'>
                <button className='mr-3 text-4xl hover:bg-yellow-500'>Leer</button>
                <button className="ml-3 text-4xl hover:bg-yellow-500"
                    onClick={(e)=>{
                        e.preventDefault();
                        setArregloPalabra([]);
                    }}
                > Limpiar</button>
            </div>
            
        </div>
    )
}

export default ArregloSilabas;