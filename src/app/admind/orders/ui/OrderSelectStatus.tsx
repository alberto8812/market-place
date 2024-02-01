'use client'

import { changeOrderStatus } from "@/actions"
import { useEffect, useState } from "react";

interface Props {
  status:'inPreparation'| 'onWay' | 'delivered';
  orderId:string
}

export const OrderSelectStatus = ({status='inPreparation',orderId=''}:Props) => {
  const [loader, setLoader] = useState(false)

    const OnchangeStatusOrder=async(orderId:string,vvalue:string)=>{
      setLoader(true)
      await changeOrderStatus(orderId,vvalue);
      setLoader(false)
    }

  return (
    <>
              <select 
              value={status }
              onChange={e=>OnchangeStatusOrder(orderId,e.target.value)}
              className="text-sm text-gray-900 w-full p-2"
              >
                <option value="inPreparation">en preparacion</option>
                <option value="onWay">en camiono</option>
                <option value="delivered">entregado</option>

              </select>
    </>
  )
}
