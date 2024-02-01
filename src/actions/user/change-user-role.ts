'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const changeUserRoles=async(userId:string,role:string)=>{

    const session = await getServerSession(authOptions);

    if(session?.user?.roles !== 'admin'){
        return {
            ok:false,
            message:'Debe estar uatenticado'
        }
    }

    try {
        const newRole= role === 'admin'? 'admin':'user'
        const user= await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                roles:newRole
            }
        });
     revalidatePath('admind/users');
    return {
        ok:true
    }
        
    } catch (error) {
        return {
            ok:false,
            message:'No se pudo actualizar el role'
        }
    }

}