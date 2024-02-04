"use client";
import React, { FC } from "react";
import { titleFont } from "@/app/config/fonts";
import Link from "next/link";
import Image from "next/image";
import { useTopMenuStore } from "@/store";
import clsx from "clsx";

interface SubCategory {
  id: string;
  name: string;
}

interface Props {
  categoryName: string;
  subcategories: SubCategory[];
  image: string;
}

export const TopMenuItem: FC<Props> = ({
  categoryName,
  subcategories,
  image,
}) => {

 const isItemMenuOpen=useTopMenuStore((state)=>state.isItemMenuOpen);
 const openItemMenu=useTopMenuStore((state)=>state.openItemMenu);
 const closeItemMenu=useTopMenuStore((state)=>state.closeItemMenu);

console.log(isItemMenuOpen)
  
  return (
    <li className=" group px-3 py-2 ">
      <button
        className={`${titleFont.className} m-2 p-2 rounded-md transition-all hover:bg-[#678680] 
    text-[rgba(0,81,89,255)] font-bold`}
      onMouseEnter={()=>openItemMenu()}
      >
        {categoryName}
      </button>

      <div
        className={
          clsx(
            "absolute top-5 left-0 transition group-hover:translate-y-6  inset-0 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 transform ",
            {
              'group-hover:visible':isItemMenuOpen,
              'group-hover:invisible':!isItemMenuOpen
            }
          )
        }
      
      >
        <div className="relative   bg-white rounded-xl shadow-xl  left-0 top-0  flex justify-start items-center pl-8">
          <div className="z-10">
            <div className="flex  h-[400px]  ">
              <div className="mt-8 ">
                <p className="uppercase tracking-wider text-gray-500 font-medium text-[15px]  ">
                  Categoria
                </p>
                <div className="  flex">
                  <div className="mt-3 text-[15px]   text-[rgba(0,81,89,255)]  grid grid-cols-6 grid-flow-row gap-2 mr-9 items-center justify-around ">
                    {subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="">
                        <Link
                          href={`/category/${encodeURIComponent(
                            categoryName + "_" + subcategory.name
                          )}`}
                          className="block p-2  
                                    -mx-2 rounded-lg hover:bg-gradient-to-br 
                                    hover:underline 
                                    ease-in-out duration-300 text-[rgba(0,81,89,255)]  font-semibold
                                    hover:text-indigo-600 text-[15px]
                                    "
                          onClick={()=>closeItemMenu()}
                        >
                          {subcategory.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className=" absolute flex  flex-col justify-end col-span-1 items-end w-[200px] right-0 bottom-0 mb-20 pr-4 rounded-md h-56 ">
                    {image !== "" && (
                      <Image
                        src={`/products/${image}`}
                        alt="product image"
                        width={600}
                        height={600}
                        className="rounded-3xl h-[300px]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
