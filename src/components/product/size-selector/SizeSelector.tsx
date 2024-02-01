
import { Inventory, Sizes } from "@/components/interfaces"
import clsx from "clsx"
import { FC } from "react"
import { Size } from '@prisma/client';
import { selectSizeProduct } from "@/app/(shop)/product/[slug]/ui/AddToCart";


interface Props{
    selecdSize?:selectSizeProduct,
    inventory:Inventory[],
    onSizeChanged:(sizeId:string,size:Sizes,inStock:number,inventory:string)=>void,
}

export const SizeSelector:FC <Props> = ({selecdSize,inventory,onSizeChanged}) => {
  return (
    <div className="my-5 ">
        <h3 className="font-bold mb-4">Tallas disponibles</h3>
        <div 
        className="flex "
        >
            {
                inventory.map(sizeData=>{
                    const {sizes,inStock, sizesId,id}=sizeData;
                  return ( <button
                    key={sizes.id}
                    onClick={()=>onSizeChanged(sizesId,sizes.size,inStock,id)}
                    className={
                        clsx(
                            "mx-2 hover:underline text-lg",
                            {
                              'underline':sizes.id===selecdSize?.sizeId
                            }
                        )
                    }
                    >
                        {
                            sizes.size
                        }
                    </button>)
})
            }

        </div>
    </div>
  )
}
