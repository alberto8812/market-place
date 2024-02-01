'use client'
import { generaterPagination } from "@/util";
import clsx from "clsx";
import Link from "next/link"
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { FC } from "react"
import { IoChevronBack, IoChevronBackOutline, IoChevronForward, IoChevronForwardOutline, IoChevronUpOutline } from "react-icons/io5";

interface Props{
    totalPages:number;

}

export const Pagination:FC <Props> = ({totalPages}) => {

   const pathName=usePathname();
   const  searchParams=useSearchParams();
   const currentPage=Number(searchParams.get('page') ? searchParams.get('page'):1)  ?? 1;

   const allPages=generaterPagination(currentPage,totalPages);

   if( currentPage<1 ){
      redirect('/');
   }
   



    const createPageUrl=(pageNumber:number|string)=>{
       
        const params=new URLSearchParams(searchParams);

        if(pageNumber=='...') {
            return `${pathName}?${params.toString()}`
        }

        if(+pageNumber <= 0){
            return `${pathName}`;
        }

        if(+pageNumber>totalPages){
            return `${pathName}?${params.toString()}`;
        }

        params.set('page',pageNumber.toString());

        return `${pathName}?${params.toString()}`

    }


  return (
    <div className="flex justify-center items-center  mb-32">
         <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">

        <li className="page-item ">
                <Link
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#" >
                   <IoChevronBackOutline  size={30} />
                </Link>
        </li>
        {
            allPages.map((page,index)=>(
                <li className="page-item" key={page + '-'+ index}>
                        <Link
                        className=
                        {
                            clsx(
                                "page-link relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                {
                                    'bg-blue-700 shadow-sm text-white hover:bg-blue-700 hover:text-white':page===currentPage
                                }
                            )
                        }
                        href={createPageUrl(page)}>{page}
                        </Link>
                </li>
            ))
        }
        



        <li className="page-item">
                <Link
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#">
                      <IoChevronForwardOutline   size={30} />
                </Link>
        </li>
        
        </ul>
    </nav>
</div>
  )
}
