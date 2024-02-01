'use serve'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getPaginaterUsers=async()=>{

    try {
        const session = await getServerSession(authOptions);
        console.log(session?.user?.roles)
        if(session?.user?.roles!=='admin'){
            return {
                ok:false,
                message:'Debe ser un usuario administrador'
            }
        }
        const users =await prisma.user.findMany({
            orderBy:{
                name:'desc'
            }
        });
        return {
            ok:true,
            users,
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            message:'Error en la consulta de  usuerios'
        }
    }

};
