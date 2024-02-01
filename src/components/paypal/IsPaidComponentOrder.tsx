'use client'
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props{
    isPaid:boolean
}

export const IsPaidComponentOrder =  ({isPaid=false}:Props) => {
  return (
    <div>
      <div
        className={clsx(
          "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 mt-2",
          {
            "bg-red-500": !isPaid,
            "bg-green-700":isPaid,
          }
        )}
      >
        <IoCardOutline size={30} className="" />
        {isPaid ? (
          <span className="mx-2">Pagado</span>
        ) : (
          <span className="mx-2">Pendiente pago</span>
        )}
      </div>
    </div>
  )
}
