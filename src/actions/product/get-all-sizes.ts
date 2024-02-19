import prisma from "@/lib/prisma"


export const getAllSizes=async()=>{
    try {
        const sizes= await prisma.sizes.findMany()
        return sizes;

        
    } catch (error) {
        throw new Error('no se  se encontraron todas las tallas ')
        
    }
}