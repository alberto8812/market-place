'use server'
import prisma from "@/lib/prisma";

export const setTrasactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const updateOrderpayment = await prisma.order.update({
      data: {
        transactionId: transactionId
      },
      where: { id: orderId },
    });


    if(!updateOrderpayment){
      return {
        ok:false,
        message:`No se encontro una order con el id ${orderId}`
      }
    }

    return {
      ok: true,
      message: "Se actualizao con Exito",
    };
  } catch (error) {
    return {
      ok: false,
      message: "no se puedo registar la orden",
    };
  }
};
