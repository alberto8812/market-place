'use server';

import prisma from "@/lib/prisma";
import { hashSync } from "bcryptjs";


export const registerUser=async(name:string,email:string,password:string)=>{
   
    try {

        const user = await prisma.user.create({
            data:{
                name,
                email:email.toLowerCase(),
                password:hashSync(password)
            }
        })
        const {password:_,...res}=user
        return {
            ok:true,
            user:res,
            message:'usuario creado'
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message:'no se pudo crear el usurio'
        }
    }


};