"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getPaginatedOrders = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user?.roles !== 'admin') {
      return {
        ok: false,
        message: "debe estar autenticado",
      };
    }
    const order= await prisma.order.findMany({
      orderBy:{
        createdAT:'desc'
      },
        // where:{
        //     userId:session.user.id
        // },
        include:{
            OrderAddress:{
                select:{
                    firstName:true,
                    lastName:true,
                }
            }
        }
    });

    console.log(order)

    return {
        ok:true,
        order:order,
    }
  } catch (error:any) {

    console.log(error);
    return {
        ok:false,
        message:error.message
    }
  }
};
