'use client'
import { FC, useState } from 'react';

import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ProductImage } from '@/components';

interface Props{
    images:string[];
    title:string;
    className?:string;
}

export const ProductSlideshow:FC <Props> = ({images,title,className}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <div className={`${className}  md:grid-cols-5 gap-2  rounded-sm `}>   
       <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={15}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        direction='vertical'
        className='col-span-1  w-4'
      >
        {
        images.map(img=>(
                <SwiperSlide key={img}>
                <ProductImage src={img}  width={300} height={300} alt={title}
                className=' object-fill rounded-md'
                />
                </SwiperSlide>

            ))
        }
      </Swiper>


        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
         height:'100vh'
        } as React.CSSProperties
      
    
       }
        spaceBetween={10}
        navigation={true}
        autoplay={{
            delay:3500
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs,Autoplay]}
        className="mySwiper2 col-span-4"

       
       
      >
        {
            images.map(img=>(
                <SwiperSlide key={img}>
                <ProductImage src={img}  width={1024} height={800} alt={title}
                className='rounded-lg object-fill'
                />
                </SwiperSlide>

            ))
        }  
      </Swiper>

    </div>
  )
}
