'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';


import { Autoplay, Navigation, Pagination } from 'swiper/modules';



import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slideShowImage.css';


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
    modules={[Autoplay, Pagination, Navigation]}
   
  >
   
     {slideImages.map((slideImage, index)=> (
        <SwiperSlide key={index} >
          <Image
                  src={`${slideImage.url}`}
                  alt={`${slideImage.caption}`}
                  className='w-full'
                  width={600}
                  height={600}
                  style={divStyle}
                  
                 />       
         </SwiperSlide> 
      ))} 
 
    </Swiper>
    
  
     
  )
}
