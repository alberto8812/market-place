'use client'
import { FC, useState } from "react";

import Image from 'next/image'
import { titleFont } from "@/app/config/fonts";
import Link from "next/link";
import { IoCartOutline, IoHeart, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Product } from "@/components/interfaces";
import { ProductImage } from "../product-image/ProductImage";
import { useFavoritesStore } from "@/store";


 interface Props {
  product:Product
  }

export const ProductCardHome:FC <Props> = ({product}) => {
  const {title,price,images,slug}=product;
  const imagesfind=images ?images: [];
  const favoritesProduct=useFavoritesStore(state=>state.favorites)
  const updateFavorite=useFavoritesStore(state=>state.updatefavorites)
  const deletefavorites=useFavoritesStore(state=>state.deletefavorites)
  const [imageMouseHover, setImageMouseHover] = useState<string>(imagesfind[0]);


 const onClickFavorites=(id:string, status:boolean)=>{

    if(status){
      updateFavorite(id)
      return;
    }

    deletefavorites(id);

 }




  return (
        <div className= "h-full ">
          <div className="relative m-0 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-[480px]">        
                <div className="relative mx-3 mt-3 flex h-80 overflow-hidden rounded-xl">
                  <Link href={`/product/${product.slug}`}>  
                      <ProductImage
                      className="object-cover" 
                      src={imageMouseHover} 
                      alt="product image" 
                      width={400}
                      height={400}
                      setImageMouseHover={setImageMouseHover}
                      imagesfind={imagesfind}
                      
                    />
              
                  </Link>
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
              </div>
            <div className="mt-4 px-5 pb-5 pt-5">
              <Link href={`/product/${product.slug}`}>
                  <h5 className={`text-xl tracking-tight text-slate-900 ${titleFont.className} hover:underline hover:text-blue-500` }>{title}</h5>
              </Link>
              <div className="mt-2 mb-5 flex flex-col items-start justify-between">
                <div className="flex items-center">
                <IoHeart size={20} className="text-gray-400"  />
                  <span className="mr-2 ml-3 rounded bg-gray-200 px-2.5 py-0.5 text-xs  font-bold">5.0</span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">${price}</span>
                    <span className="text-sm text-slate-900 line-through">$699</span>
                  </p>
                  <div  
                  className="cursor-pointer"
                  >
                    {
                      favoritesProduct.includes(product.id) 
                      ? ( <IoHeart   size={40} className="m-2 text-red-600" onClick={()=>onClickFavorites(product.id,false)}/> )
                      :( <IoHeartOutline  size={40} className="m-2 text-red-600"  onClick={()=>onClickFavorites(product.id,true)}/> )
                    } 
                  
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

  )
}

