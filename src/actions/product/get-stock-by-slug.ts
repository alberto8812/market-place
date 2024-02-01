'use server';
import prisma from "@/lib/prisma";




export const getStockBySlug= async(slug:string,sizesId:string='')=>{


    try {

        const procutStock= await prisma.product.findUnique({
            select:{
                 inStock:true,
                 inventory:{
                    select:{
                        inStock:true,
                    },
                    where:{
                        sizesId
                    }
                 }
             },
            where:{
                slug,
            }
        })
    

    return procutStock?.inventory?procutStock?.inventory[0]?.inStock:0;


    } catch (error) {
        console.log(error)
        throw new Error('problemas en el stock')
        
    }
}