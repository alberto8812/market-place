import { titleFont } from '@/app/config/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RiFacebookFill, RiInstagramLine, RiWhatsappLine } from "react-icons/ri";



export const Footer = () => {
  return (
    <div className='grid sm:grid-cols-2 grid-cols-1 justify-evenly al bg-[rgba(186,183,120,255)] w-full p-2 pb-7'>
       <div className='flex flex-col justify-center items-center mt-3'>
         <Image
         src="/imgs/marketplace-logo.png"
         width={200}
         height={200}
         alt=''
         />
         <div className='mt-5 flex flex-col justify-center items-center'>
            <span className={`${titleFont.className} antialiased font-bold text-2xl mt-3 text-[rgba(0,81,89,255)]`}>Siguenos</span>
            <div className='flex mt-2 justify-between'>
            <Link
            href='/'
            >
                <RiFacebookFill   size={40} className="text-[rgba(0,81,89,255)] mr-3"/>
            </Link>
            <Link
            href='/'
            >
                <RiInstagramLine    size={40} className="text-[rgba(0,81,89,255)] mr-3"/>
            </Link>
            <Link
             href='/'
            >
                <RiWhatsappLine    size={40} className="text-[rgba(0,81,89,255)] mr-3"/>
            </Link>
            </div>
         </div>
       </div>
       <div className='grid sm:grid-cols-2 grid-cols-1 justify-between items-center'>
            {/* pedidos */}
        <div className='mt-5 flex flex-col justify-center sm:items-end items-center'>
        <span className={`${titleFont.className} antialiased font-bold text-2xl mt-3 text-[rgba(0,81,89,255)] underline`}>Tuspedidos</span>
       
        <div className='flex flex-col mt-2 justify-between'>
             <Link
             href='/'
             className='mt-3'
             >
                <span className={`  text-2xl mt-3 text-[rgba(0,81,89,255)]  `}>Sigue tu guía</span>
             </Link>
             <Link
             href='/'
             className='mt-3'
             >
                  <span className={`text-2xl mt-3 text-[rgba(0,81,89,255)] `}>Devoluciones</span>
             </Link>
             <Link
              href='/'
              className='mt-3'
             >
                <span className={`   text-2xl mt-3 text-[rgba(0,81,89,255)] `}>Q & A</span>
             </Link>
             </div>
 
 
        </div>
       
       {/* Contact */}
        <div className='mt-5 flex flex-col justify-center items-center  '>
        <span className={`${titleFont.className} antialiased font-bold text-2xl mt-3 text-[rgba(0,81,89,255)] underline`}>Contacto</span>
       
        <div className='flex flex-col mt-2 justify-between'>
             <Link
             href='/'
             className='mt-3'
             >
                <span className={` text-2xl mt-3 text-[rgba(0,81,89,255)]  `}>Dirección</span>
             </Link>
             <Link
             href='/'
             className='mt-3'
             >
                  <span className={` text-2xl mt-3 text-[rgba(0,81,89,255)] `}>Telefono</span>
             </Link>
             <Link
              href='/'
              className='mt-3'
             >
                <span className={`  text-2xl mt-3 text-[rgba(0,81,89,255)] `}>Correo</span>
             </Link>
             </div>
           </div>
       </div>
    </div>
  )
}
