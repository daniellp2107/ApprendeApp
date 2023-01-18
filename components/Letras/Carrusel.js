import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const Carrusel = () => {
  return (
    <div className='w-auto'>
        <Swiper
                pagination={true}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Image
                        className="object-fill w-full h-96"
                        src="https://i.ibb.co/JBxm1Kp/avion.png"
                        alt="image slide 1"
                        width={300}
                        height={300}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        className="object-fill w-full h-96"
                        src="https://i.ibb.co/7tCGb31/arbol.png"
                        alt="image slide 2"
                        width={300}
                        height={300}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        className="object-fill w-full h-96"
                        src="https://i.ibb.co/zxXFRHB/Fc-Oy-Vh-HWQAA-f-U.jpg"
                        alt="image slide 3"
                        width={300}
                        height={300}
                    />
                </SwiperSlide>
            </Swiper>

    </div>
  )
}

export default Carrusel;