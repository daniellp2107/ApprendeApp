import React from 'react';

const Caja =({silaba} )=>(

    <div className="flex ">   
        <button className='m-3 p-2 text-4xl text-white bg-blue-500'
            type='button'
        >{silaba}</button>
        
    </div>
)

export default Caja;