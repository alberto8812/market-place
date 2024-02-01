'use client'

import { FC, useState } from "react";
import Link from "next/link";
import { CategoriesSubcategories } from "@/components/interfaces";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { IoChevronDown, IoChevronForward, IoCloseCircleOutline, IoHome, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";
import { SidebarMobilCategorySucategoryLoad } from "@/components";
import { titleFont } from "@/app/config/fonts";


interface Props{
    categoriesSubcategories:CategoriesSubcategories[];
  
  }


export const SidebarItemMobil:FC <Props> = ({categoriesSubcategories}) => {
   

    const isSideItemMovilOpen=useUIStore(state=>state.isSideItemMovilOpen);
    const closeSideItemMovilOpen=useUIStore(state=>state.closeSidItemMovilOpen);



  return (
    <div>
        {/* background black */}
        {
         isSideItemMovilOpen && (       
            <div
            onClick={closeSideItemMovilOpen} 
            className="fixed top-0 left-0 w-screen h-screen z-40 bg-black opacity-30 "
        />
        )
        }
        {/* blur */}
        {

         isSideItemMovilOpen && ( 
            <div 
             className="fade-in fixed z-40 top-0 left-0 h-screen backdrop-filter backdrop-blur-sm "
            />
             )   
        }
        {/* side menu */}

        <nav
        className={
            clsx(
                "fixed bg-white w-[280px] z-50 h-screen shadow-2xl left-0 top-0 transform transition-all duration-300 ",
                {
                    "-translate-x-full":!isSideItemMovilOpen
                }
            )
        }
        >

          
         <IoCloseCircleOutline  
            size={30}
            className="absolute top-5 left-5 cursor-pointer"
            onClick={()=>closeSideItemMovilOpen()}
           />

           <Link
           href={'/'}
           className="absolute top-5 right-5 cursor-pointer"
           >

            <IoHome   
                size={30}
                
                onClick={()=>closeSideItemMovilOpen()}
            />
           </Link>


           {/*input */}
        <div className="relative mt-20">
            <IoSearchOutline
            size={20}
            className="absolute top-2 right-2"
            />
            <input
                type='text'
                placeholder='Buscar'
                className='w-full bg-gray-50 rounded pl-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
            />

        </div>
                {/* menu */}
     {/*  */}
        <div className="border-y py-5 border-slate-300 overflow-y-auto h-full">
        <small className={`pl-3  inline-block mb-2 ${titleFont.className} text-2xl`} >
          categorie
        </small>
           {
             categoriesSubcategories.map(category=>(

                 <SidebarMobilCategorySucategoryLoad categoryName={category.name} key={category.id}  subcategories={category.subCategory} image={category.image} />
             )) 

           }
        </div>

{/*  */}

        </nav>
    </div>
  )
}
