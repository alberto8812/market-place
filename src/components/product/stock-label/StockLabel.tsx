'use client'

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/app/config/fonts"
import { useCartStore } from "@/store";
import { FC, useEffect, useState } from "react";


interface Props{
  slug:string;
}

export const StokcLabel:FC <Props> = ({slug}) => {

  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const sizeId        = useCartStore(state=>state.sizeId);
   
   useEffect(() => {
     const getStock= async()=>{
      setIsLoading(true);
     const getInStock= await getStockBySlug(slug,sizeId ?? '');
     setStock(getInStock);
     setIsLoading(false);
  
     };
    getStock()
   }, [sizeId,slug])



  return (
    <div>
      {/* {
        isLoading
        ?(
         <h1 className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-200`}>
            &nbsp;
        </h1>

        ):
        ( */}

        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
           Disponibles: {!isLoading && (stock)}
         </h1>
        {/* )
      } */}
    </div>
  )
}
