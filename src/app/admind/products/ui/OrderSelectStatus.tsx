'use client'

import { changeOrderStatus } from "@/actions"

interface Props {
  status:'inPreparation'| 'onWay' | 'delivered';
  orderId:string
}

export const OrderSelectStatus = ({status='inPreparation',orderId=''}:Props) => {
  return (
    <>
              <select 
              value={status }
              onChange={e=>changeOrderStatus(orderId,e.target.value)}
              className="text-sm text-gray-900 w-full p-2"
              >
                <option value="inPreparation">en preparacion</option>
                <option value="onWay">en camiono</option>
                <option value="delivered">entregado</option>

              </select>
    </>
  )
}
