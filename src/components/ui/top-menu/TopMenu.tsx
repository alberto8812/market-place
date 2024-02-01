'use client'
import Link from 'next/link'
import Image from 'next/image';

import { titleFont } from '@/app/config/fonts'

import { IoSearchOutline,IoCartOutline,IoPersonCircleOutline,IoMenuOutline, IoHomeOutline   } from "react-icons/io5";
import { TopMenuItem } from '../top-menu-item/TopMenuItem';
import { useCartStore, useUIStore } from '@/store';
import { FC, useEffect, useState } from 'react';
import { Product } from '@/components/interfaces';





interface SubCategory {
  id:string,
  name:string
}

interface CategoriesSubcategories{
  id:string,
  name:string
  subCategory:SubCategory[],
  image:string
}

interface Props{
  categoriesSubcategories:CategoriesSubcategories[];

}

export const TopMenu:FC <Props> =({categoriesSubcategories}) => {
  const openSideMenu=useUIStore(state=>state.openSideMenu);
  const openSidItemMovilOpen=useUIStore(state=>state.openSidItemMovilOpen);
  const totalItemsCart=useCartStore(state=>state.getTotalItems());
  const [isloaded, setIsloaded] = useState(false);

   useEffect(() => {
     setIsloaded(true)
   }, [])


  
  return (
    <nav className='flex flex-col justify-between items-center w-full bg-[rgba(245,245,245,255)]'>
       <div className='flex px-5 justify-between items-center w-full pb-5 pt-2 bg-[rgba(156,34,78,255)]'>       
            <div  className='m-2 p-2 rounded-md transition-all hover:bg-[#b76080] text-white'>
                    <IoMenuOutline   
                    className="w-10 h-10 text-cyan-50 block lg:hidden" 
                      onClick={openSidItemMovilOpen}
                     />
                    <Link
                    href={'/'}
                    >
                      <IoHomeOutline    
                      className="w-8 h-8 text-cyan-50 hidden lg:block" 
              
                      size={10}
                      />
                    </Link>
    
            </div>

            {/**  MENU  logo*/}
            <div className=''>
                <Image
                  src="/imgs/CLARA RIVERA_LOGO SLOGAN.png"
                  alt='logo shop'
                  className=''
                  width={350}
                  height={350}
                 />
            </div>
          
          {/* search cart, menu */}

          <div className='flex items-center'>
                  <Link  href="/" className='mx-2'>
                    <IoSearchOutline  className="w-8 h-8  text-cyan-50" />
                  </Link>

                  <div className='mx-2'>
                    <IoPersonCircleOutline   className="w-8 h-8  text-cyan-50"    onClick={openSideMenu} />
                  </div>

                  <Link  href={`${(totalItemsCart>0) && (isloaded) ?'/cart':'/empty'}`} className='mx-2'>
                    <div className='relative'>
                     {
                       (isloaded) && (totalItemsCart>0) &&
                       (<span className=' fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
                           {totalItemsCart}
                         </span>)
                      }
                      <IoCartOutline  className="w-8 h-8 text-cyan-50"  />
                    </div>
                  </Link>
          </div>
      </div>
      <div className='flex justify-center items-center text-center'>
          <span className={`${titleFont.className}rounded-md transition-all hover:bg-[#b76080] font-bold text-center `} >
            Envios gratis por compras superiores $100.000 COP
          </span>
      </div>
      <div className='bg-[rgba(211,207,184,255)] w-full flex  justify-center  items-center'>
        <div className=' bg-[rgba(211,207,184,255)] flex-col relative items-center hidden sm:hidden md:hidden  lg:block '>
           <ul className='flex items-center justify-center font-semibold scroll-m-5 '>
 
              {
                 categoriesSubcategories.map(category=>(
                 <TopMenuItem categoryName={category.name} key={category.id}  subcategories={category.subCategory} image={category.image}/>
               ))   
             }
 
           </ul>


         </div>
      </div>
    </nav>
  )
}