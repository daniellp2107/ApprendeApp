import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import voz from '../../multimedia/voz.png'
import ReactAudioPlayer from 'react-audio-player';

const Sonido = ({url, nombre}) => {
    const [ctlaudio,setCtlaudio] = useState();
    
    function playAudio (){
        const audioE1 = document.getElementsByClassName("audio-element")[0];
        audioE1.play();
    }    

    function reproducir(dato){
        dato.controls = true;
    }
  return (

    <div className='flex justify-center'>
        <button onClick={playAudio}>
        <Image  
              src={voz} 
              alt={`Imagen`}
              width={100}  
              height={50}
            />
            <p>{nombre}</p>
        </button>
        <audio className="audio-element">
            {/* <source src={url}></source> */}
            <source src={'https://assets.coderrocketfuel.com/pomodoro-times-up.mp3'}></source>
        </audio>     
        
    </div>
  )
}

export default Sonido;