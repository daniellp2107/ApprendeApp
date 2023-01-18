import React from 'react';
import Button from './Button';

const abecedarioLetras = ['a', 'b', 'c','d', 'e', 'f', 'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z'];

const renderButtons = (onClickABC) =>{
    const renderButton = abecedario =>(
        <Button className=" " key={`Letra ${abecedario}`} letra={abecedario} clickHandler={onClickABC}/>
    )   
    
    return abecedarioLetras.map(renderButton);
}

const Abecedario = ({onClickABC}) => (
    <section className="flex flex-wrap md:w-1/2">
        {renderButtons(onClickABC)}
    </section>
)

export default Abecedario;