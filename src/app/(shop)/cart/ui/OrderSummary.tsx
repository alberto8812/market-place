'use client'

import { useCartStore } from "@/store"
import { currencyFormat } from "@/util";
import { useEffect, useState } from "react";

export const OrderSummary = () => {

    const {itemsInCart,subtotal,tax,total}=useCartStore(state=>state.getSumaryInformation());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        setLoaded(true);
  
    }, [])

    if(!loaded){
        return(
            <h1>cargando...</h1>
        )
    }


  return (
    <>
        <div className="grid grid-cols-2">
              <span >No. Producto</span>
              <span className="text-right">{itemsInCart} articulos</span>

              <span >Subtotal</span>
              <span className="text-right"> {currencyFormat(subtotal)}</span>

              <span >Impuesto (15%)</span>
              <span className="text-right"> {currencyFormat(tax)}</span>

              <span className="mt-2 text-2xl">Total</span>
              <span className="mt-5  text-right text-2xl">{currencyFormat(total)}</span>
        </div>
    </>
  )
}
