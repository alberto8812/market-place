'use server'
import prisma from "@/lib/prisma";

export const deleteUserAddres=async(userId:string)=>{
    try {
        

        await prisma.userAddress.delete({where:{userId}});

        return{
            ok:true,
            message:'direccion eliminada de la base de datos '
        }
        
    } catch (error) {
        console.log(error);
        return{
            ok:false,
            message:'no se puedo eliminar la direccion de la base de datos'
        }
    }
};