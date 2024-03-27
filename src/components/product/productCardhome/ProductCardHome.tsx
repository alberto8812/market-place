"use client";
import { FC, useRef, useState } from "react";
import { titleFont } from "@/app/config/fonts";
import Link from "next/link";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Product } from "@/components/interfaces";
import { ProductImage } from "../product-image/ProductImage";
import { CardFavorite } from "./CardFavorite";
import { useGSAP } from "@gsap/react";


interface Props {
  product: Product & { priceSale: number };

}

export const ProductCardHome: FC<Props> = ({ product }) => {
  const { title, price, images, slug } = product;
  const imagesfind = images ? images : [];
  const [imageMouseHover, setImageMouseHover] = useState<string>(imagesfind[0]);

 


  return (
    <div className="h-full "  >
      <div className="relative m-0 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-[480px]">
        <div className="relative mx-3 mt-3  h-80 flex overflow-hidden rounded-xl bg-slate-400 ">
          <Link href={`/product/${product.slug}`}>
            <ProductImage
              className="object-cover h-80"
              src={imageMouseHover}
              alt="product image"
              width={400}
              height={400}
              setImageMouseHover={setImageMouseHover}
              imagesfind={imagesfind}
            />
          </Link>
          {product.sale > 0 && (
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{`${
              product.sale * 100
            }% OFF`}</span>
          )}
        </div>
        <div className="mt-6 px-5 pb-3 pt-5 h-60 ">
          <Link href={`/product/${product.slug}`}>
            <h5
              className={`text-xl  tracking-tight text-slate-900  ${titleFont.className} hover:underline hover:text-blue-500`}
            >
              {title.length > 20 ? title.slice(0, 20) + "..." : title}
            </h5>
          </Link>
          <div className="mt-2 mb-5 flex flex-col items-start justify-between">
            <div className="flex items-center">
              <IoHeart size={20} className="text-gray-400" />
              <span className="mr-2 ml-3 rounded bg-gray-200 px-2.5 py-0.5 text-xs  font-bold">
                5.0
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <p>
                <span className="text-3xl font-bold text-slate-900">
                  ${product.priceSale.toFixed(2)}
                </span>
                {product.sale > 0 && (
                  <span className="text-sm text-slate-900 line-through">
                    ${price}
                  </span>
                )}
              </p>
              <CardFavorite id={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
