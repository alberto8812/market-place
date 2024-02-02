"use client";
import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { FC, useState } from "react";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

interface SubCategory {
  id: string;
  name: string;
}

interface Props {
  categoryName: string;
  subcategories: SubCategory[];
  image: string;
}

export const SidebarMobilCategorySucategoryLoad: FC<Props> = ({
  categoryName,
  subcategories,
}) => {
  const closeSideItemMovilOpen=useUIStore(state=>state.closeSidItemMovilOpen);
  const [subMenu, setSubMenuOpen] = useState(false);
  return (
    <>
      <div className="fle flex-col gap-1 ">
        <div>
          <li
            onClick={() => setSubMenuOpen(!subMenu)}
            className="flex items-center mt-2
                0 p-2 hover:bg-gray-100 rounded transition-all justify-between"
          >
            <span
              className="block p-2  
                 -mx-2 rounded-lg hover:bg-gradient-to-br 
                  hover:underline 
                  ml-3
                  ease-in-out duration-300   font-semibold
                 hover:text-indigo-600 text-[15px]"
            >
              {categoryName}
            </span>
            {subMenu ? (
              <IoChevronDown size={25} />
            ) : (
              <IoChevronForward size={25} />
            )}
          </li>
          <ul
            className={clsx(
              "flex flex-col pl-14 text-[0.8rem] font-normal overflow-hidden ",
              {
                "h-full": subMenu,
              },
              {
                "h-0": !subMenu,
              }
            )}
          >
            {subcategories.map((subCategory) => (
              <Link
                href={`/category/${encodeURIComponent(
                  categoryName + "_" + subCategory.name
                )}`}
                className="block p-2  
                          -mx-2 rounded-lg hover:bg-gradient-to-br 
                          hover:underline 
                          ease-in-out duration-300   font-semibold
                          hover:text-indigo-600 text-[15px]
                          "
                key={subCategory.id}
                onClick={()=>closeSideItemMovilOpen()}
              >
                <li className="flex items-center mt-1 p-2 hover:bg-gray-100 rounded transition-all">
                  {subCategory.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
