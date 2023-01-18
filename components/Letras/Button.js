import React from 'react';

const Button=({letra, clickHandler} )=>(

    <div className="flex">   
        <button 
            className='m-3 p-2 text-white text-4xl font-bold hover:bg-yellow-500' 
            onClick={()=>clickHandler(letra)}
        >
            {letra}
        </button>
        
    </div>
)

export default Button;