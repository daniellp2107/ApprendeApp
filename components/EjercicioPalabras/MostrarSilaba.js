import React from 'react';
import Caja from './Caja';

const renderCajas =(arreglo)=>{
    // console.log(arreglo);
    
    const renderCaja =(silabas)=>(
        <Caja key={`Silaba ${silabas}`} silaba={silabas}/>
    )
    return arreglo.map(renderCaja);
}

const MostrarSilabas = ({arreglo}) => (
    <section className="flex flex-wrap ">
        {renderCajas(arreglo)}
    </section>
);

export default MostrarSilabas;