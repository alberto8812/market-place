"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Sizes } from "@/components/interfaces";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

interface Props {
  product: Product;
}

export interface selectSizeProduct {
  sizeId: string;
  size: Sizes;
  inStock: number;
  idInventory:string
}

export const AddToCart = ({ product }: Props) => {
  //todo sacar las sizes del inventario
  const { sizes, inventory } = product;
  const addProductToCart = useCartStore((state) => state.addProductToCard);
  const upDateSizeId = useCartStore((state) => state.upDateSizeId);
  const [sizeData, setsizeData] = useState<selectSizeProduct>({
    sizeId: "",
    size: "NA",
    inStock: 0,
    idInventory:''
  });
  const [Quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);
  //  sizes[0]==='NA' &&  setSize('NA');

  useEffect(() => {
    if(inventory){

      upDateSizeId(inventory[0].sizesId);
      setsizeData({
        sizeId: inventory[0].sizesId,
        size: inventory[0].sizes.size,
        inStock: inventory[0].inStock,
        idInventory: inventory[0].id,
      });
    }
  }, []);

  const addTocart = () => {
    setPosted(true);

    if (!sizeData.sizeId) return;
    const { size, inStock, sizeId,idInventory } = sizeData;
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: Quantity,
      size: size,
      image: product.images ? product.images[0] : "",
      inStock: inStock,
      sizeId: sizeId,
      idInventory: idInventory,
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setsizeData({ sizeId: "", size: "NA", inStock: 0 ,idInventory:''});
  };

  const onSizeChanged = (sizeId: string, size: Sizes, inStock: number,idInventory:string) => {
    upDateSizeId(sizeId);
    setsizeData({ sizeId, size, inStock,idInventory });
  };

  return (
    <>
      {posted && !sizeData && sizes.length > 0 && (
        <span className="mt-2 text-red-500 fade-in">
          Debe de seleccionar una talla *
        </span>
      )}

      {/* selecto de tallas */}
      {
        // sizes.length >1 &&
        // (<SizeSelector
        //   selecdSize={size}
        //   availableSizes={sizes}
        //   onSizeChanged={setSize}
        //   />)
        inventory && (
          <SizeSelector
            selecdSize={sizeData}
            inventory={inventory}
            onSizeChanged={onSizeChanged}
          />
        )
      }
      <div className=" flex  pt-4 pb-3">
        <QuantitySelector quantity={Quantity} onquantityChange={setQuantity} />
      </div>

      <div className=" flex  pt-4 pb-3 justify-left items-center">
        <IoAddCircleOutline size={25} className="text-red-400" />
        <h3 className="font-bold text-4x text-red-400 ml-3">
          Añadir a tus favoritos
        </h3>
      </div>

      {/* button */}
      <button className="btn-primary my-3" onClick={addTocart}>
        Agregar al carrito
      </button>
    </>
  );
};
