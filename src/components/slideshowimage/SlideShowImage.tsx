'use client'
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import Image from 'next/image';


import { Autoplay, Navigation, Pagination } from 'swiper/modules';



import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slideShowImage.css';
import { useEffect, useState } from 'react';


const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '600px',
    width:'80hw'
    
  }




const slideImages = [
    {
      url: '/imgs/slide/img1.jpg',
      caption: 'Slide 1'
    },
    {
      url: '/imgs/slide/img2.jpg',
      caption: 'Slide 2'
    },
    {
      url: '/imgs/slide/img3.jpg',
      caption: 'Slide 3'
    },
  ];







export const SlideShowImage = () => {
 


  

  return (
   <div className='h-fit'>
    <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: true,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
   // className='w-fit bg-red-500'
    modules={[Autoplay, Pagination, Navigation]}

    style={
      {
        height:'450px'
      }
    }
   
  >
   
     {slideImages.map((slideImage, index)=> (
        <SwiperSlide key={index} >
          <Image
                  src={`${slideImage.url}`}
                  alt={`${slideImage.caption}`}
                  //className='w-full'
                  width={900}
                  height={900}
                  style={divStyle}
                  
                 />       
         </SwiperSlide> 
      ))} 
 
    </Swiper>
    
    </div>
     
  )
}
