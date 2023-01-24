import React, {useEffect} from 'react';
import Image from 'next/image';
import { Navigation, Thumbs } from 'swiper';
import { imagen_nombre } from '../../multimedia/index';
import Sonido from './Sonido';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Carrusel = ({letra}) => {
  console.log(`desde Carrucel ${letra}`);

  const pattern = new RegExp(`[${letra}]+`);
  const nuevoIndice = [];
  const filtro = imagen_nombre.filter( dato => pattern.test(dato.alias));
  console.log(filtro);

  useEffect(() => {
    console.log('Nueva letra');
  }, [letra]);

  return (
    <Swiper
      loop={true}
      spaceBetween={10}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation, Thumbs]}
      grabCursor={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      initialSlide={1}
      
      // onNavigationNext={}
      // onNavigationPrev={}
      
    >
      {filtro.map((dato, index)=>(
        <SwiperSlide 
          key={index} 
          className="flex justify-center"
          virtualIndex={0}
        >
          <div className='mb-5'>
            <Image  
              src={dato.ruta} 
              alt={`Imagen`}
              width={300}  
              height={300}
            />
            <div>
              <p className='self-end text-center mt-5'>{`${dato.nombre}`}</p>
              {/* {console.log(dato.voz)} */}
              
              <Sonido url={dato.voz} nombre={dato.nombre}/>
            </div>
            
          </div>
        </SwiperSlide>
          
        ))
      }
    </Swiper>
  )
}

export default Carrusel;