import React from 'react';
import Image from 'next/image';
import { Navigation, Thumbs } from 'swiper';
import {imagenes} from '../../imagenes/index';
import {nombreImagenes} from '../../imagenes/index';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Carrusel = ({letra}) => {
  console.log(`desde Carrucel ${letra}`);
  // const pattern = new RegExp('^[A-Z]+$', 'i');
  // /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g para acentos y Ñ

  const cadena = imagenes.toString();
  console.log(cadena);
  const pattern = new RegExp(`[${letra}]+`);
  const nuevoIndice = [];
  const filtro = nombreImagenes.filter( nombre=> pattern.test(nombre));
  console.log(filtro);

  // const nuevaCadenaImagenes = 

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
    >
      {imagenes.map((imagen, index)=>(
        <SwiperSlide key={index} className="flex justify-center">
          <div className='mb-5'>
            <Image  
              src={imagen} 
              alt={`Imagen`}
              width={300}  
              height={300}
            />
            <p className='self-end text-center mt-5'>{`${nombreImagenes[index]}`}</p>
          </div>
        </SwiperSlide>
          
        ))
      }
    </Swiper>
  )
}

export default Carrusel;