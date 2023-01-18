import React from 'react';
import Button from '../Palabras/Button';

const silabasLetras = ['a','e','i','o','u','b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];

const renderButtons = (onClickSilabas) =>{
    const renderButton = silabario =>(
        <Button className=" " key={`Silaba ${silabario}`} silaba={silabario} clickHandler={onClickSilabas}/>
    );
    return silabasLetras.map(renderButton);
}

const Silabas = ({onClickSilabas}) => (
    <section className="flex flex-wrap">
        {renderButtons(onClickSilabas)}
    </section>
);

export default Silabas