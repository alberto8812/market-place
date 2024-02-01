'use client'
import { FC, useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"


interface Props {
  quantity:number,
  onquantityChange:(qunatity:number)=>void,
}

export const QuantitySelector:FC <Props> = ({quantity,onquantityChange}) => {
 

   const onQuantityChanged=(value:number)=>{

    onquantityChange(Math.max(quantity+value,1));
   }

  return (
    <div className="flex ">
      <button
       onClick={()=>onQuantityChanged(-1)}
      >
        <IoRemoveCircleOutline size={30}/>
      </button>
        <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">{quantity}</span>
      <button
      onClick={()=>onQuantityChanged(1)}
      >
        <IoAddCircleOutline size={30}/>
      </button>
    </div>
  )
}
