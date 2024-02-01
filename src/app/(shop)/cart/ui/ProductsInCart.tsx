'use client';
import { ProductImage, QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useCartStore } from "@/store";
import Link from "next/link";
import { CartProduct, Product } from "@/components/interfaces";


export const ProductsInCart = () => {
    const productInCart=useCartStore(state=>state.cart);
    const updateProductCart=useCartStore(state=>state.updateProductQuantity);
    const deleteProductCart=useCartStore(state=>state.removeProduct);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true)
    }, [])


    if(!loaded){
        return(
            <p>Loading...</p>
        )
    }


  const onchangeQuanityt=(product:CartProduct,quantity:number)=>{

    updateProductCart(product,quantity)

  }
    
  return (
    <>
          {/* item */}
          {
            productInCart.map(product=>(
              <div className="flex" key={`${product.slug}-${product.size}`}>
                <ProductImage
                  src={product.image}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded w-[]"
                  style={
                    {
                      width:'100px',
                      height:'100px'
                    }
                  }
                />

                <div>
                <Link
                 href={`/product/${product.slug}`}
                 className="hover:underline cursor-pointer"
                >
                  <p>{`${product.title}-${product.size}`}</p>
                </Link>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={product.quantity} onquantityChange={(quantity)=>onchangeQuanityt(product,quantity)}/>
                  <button 
                  className="underline mt-3"
                  onClick={()=>deleteProductCart(product)}
                  >
                    Remover
                  </button>
                </div>

              </div>
            ))
          }</>
  )
}
