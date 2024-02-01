'use client'
import { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { ProductImage } from '@/components';

interface Props{
    images:string[];
    title:string;
    className?:string;
}

export const ProductMobileSlideshow:FC <Props> = ({images,title,className}) => {
   
  return (
     <div className={className}>
        <Swiper
        style={{
          width:'100hw',
          height:'500px'
        }}
          
           pagination
            autoplay={{
                delay:3500
            }}
           
            modules={[FreeMode,Autoplay,Pagination]}
            className="mySwiper2"
          
          
          
          >
            {
                images.map(img=>(
                    <SwiperSlide key={img}>
                    <ProductImage src={img}  width={600} height={500} alt={title}
                    className=' object-fill'
                    />
                    </SwiperSlide>

                ))
            }  
          </Swiper>
     



         
     </div>

   
  )
}
