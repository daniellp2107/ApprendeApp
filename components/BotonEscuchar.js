import React from 'react';
import Image from 'next/image';
import voz from '../multimedia/voz.png'

const BotonEscuchar = () => {

    function playAudio (){
        const audioE1 = document.getElementsByClassName("audio")[0];
        audioE1.play();
    } 
    return (
        <div>
            <button className='' onClick={playAudio}>
            <Image  
                src={voz} 
                alt={`Imagen`}
                width={50}  
                height={50}
                />
            </button>

            <audio className="audio">
            <source src={'/voz/grabacion.mp3'}></source>
            {/* <source src={'https://assets.coderrocketfuel.com/pomodoro-times-up.mp3'}></source> */}
            </audio>
        </div>
        
    )
}

export default BotonEscuchar;