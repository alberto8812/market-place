'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const changeOrderStatus=async(OrderId:string,status:string)=>{

    const session = await getServerSession(authOptions);


    if(session?.user?.roles !== 'admin'){
        return {
            ok:false,
            message:'Debe estar uatenticado'
        }
    }

    try {
        const newStatus= status === 'inPreparation'? 'inPreparation':status === 'onWay'?'onWay':'delivered'

        const Order= await prisma.order.update({
            where:{
                id:OrderId
            },
            data:{
                status:newStatus
            }
        });

     
     revalidatePath('admind/orders');
    return {
        ok:true
    }
        
    } catch (error) {
        return {
            ok:false,
            message:'No se pudo actualizar el estado de envio'
        }
    }

}