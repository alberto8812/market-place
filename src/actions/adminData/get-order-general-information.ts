'use server'

import prisma from "@/lib/prisma";


export const getOrderGenerarInformation =async ()=>{
    try {

        const OrderCount= await prisma.order.groupBy(
            {
              by:['isPaid'],
              _count:{
                isPaid:true
              }

            }
        );
        const isPiad=OrderCount.find(count=>count.isPaid==true ) || { _count: { isPaid: 0 }};
        const isNoPiad=OrderCount.find(count=>count.isPaid==false) || { _count: { isPaid: 0 } };
        const totalOrder=isPiad?._count.isPaid +isNoPiad?._count.isPaid ;
        return {
            ok:true,
            isPiad,
            isNoPiad,
            totalOrder
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:true,
            messge:'No se encontro la informacion necesaria'
        }
    }
};