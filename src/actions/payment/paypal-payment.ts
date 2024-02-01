"use server";

import { PayPalOrderStatusResponse } from "@/components/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypaltransaccionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de verficacion",
    };
  }

  const resp=await verifyPayPalPatyment(paypaltransaccionId,authToken);

  if(!resp){
    return{
      ok:false,
      messege:'Error al verificar el pago'
    }
  }

  const {status,purchase_units}=resp;
  const{invoice_id}=purchase_units[0]

  if(status !=='COMPLETED'){
    return {
      ok:false,
      message:'Aún no se ha realizado el pago en PayPal'
    }

    
    //update data base with the pay 
  }
  try {
    await prisma.order.update({
      where:{
        id:invoice_id
      },
      data:{
        isPaid:true,
        paidAt:new Date(),
      }
    })

    revalidatePath(`/oders/${invoice_id}`);

    return{
      ok:true
    }
  } catch (error) {
    console.log(error)
    return{
      ok:false,
      message: '500- El pago no se pudo Adtualizar'
    }
  }

};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: 'no-store'
    }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPatyment = async (papalTransactionId: string,bearToaken: string):Promise<PayPalOrderStatusResponse | null> => {

  const paypayOrderUrl=`${process.env.PAYPAL_ORDERS_URL}/${papalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${bearToaken}`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
   const response= await fetch(paypayOrderUrl,{...requestOptions,cache:'no-store'}).then(r=>r.json());
   return response;
    
  } catch (error) {
    console.log(error)
    return null
  }


};
