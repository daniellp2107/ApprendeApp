import React from 'react';

const Button=({silaba, clickHandler} )=>(

    <div className="flex ">   
        <button 
            className='flex justify-center items-center w-20 h-20 text-white text-4xl font-bold hover:bg-yellow-500' 
            onClick={()=>clickHandler(silaba)}
        >
            {silaba}
        </button>
        
    </div>
)

export default Button;