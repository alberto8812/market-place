'use server'

import { Address, Country } from '@/components/interfaces';
import prisma from "@/lib/prisma";

 export const setUserAddress=async(address:Address,userId:string)=>{
 

     try {

        const newAddress= await creatOrReplaceAddress(address,userId);

        return {
            ok:true,
            address:newAddress
        }
        
     } catch (error) {
        console.log(error)

        return {
            ok:false,
            message:'No se pudo grabar la direccion'
        }
     }


 };

 const creatOrReplaceAddress=async(address:Address,userId:string)=>{

    try {

        const storeAddress= await prisma.userAddress.findUnique({
            where:{userId}
        });

        const addressToSave={
            address:address.address,
            address2:address.optionalAddres,
            countryId:address.country,
            firstName:address.firstName,
            lastName:address.lastName,
            phone:address.phone,
            postalCode:address.postalCode,
            city:address.city,
            userId:userId,
        }
        if(!storeAddress){
            const newAddress =await prisma.userAddress.create({
                data:addressToSave,     
            });
            return newAddress;
        }


        const updateAddress= await prisma.userAddress.update({
            data:addressToSave,
            where:{userId}
        });

        return updateAddress;

        
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo grabar la direccion')
    }

 };
