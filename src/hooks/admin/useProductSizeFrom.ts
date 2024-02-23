import { useState } from "react";
import { 
    Product,
    ProductImage as ProductWithImage,
    Size,
} from "@/components/interfaces";

interface PorpsHook {
    product: Partial<Product> & {
      productImage?: ProductWithImage[];
      /*,inventoryo?:Inventory*/
    } & { garmentTypesId?: string } & { sizeCategoriesId?: string };

  }
export const useProductSizeFrom = ({product}:PorpsHook) => {

    const inventory =
    product?.inventory?.map((invent) => ({
      ...invent,
      sizes: invent.sizes.size,
    })) ?? [];

    
   const [loadSizes, setLoadSizes] = useState<Size[]>([]);




return {
    inventory,
    loadSizes,
    setLoadSizes
}

}
