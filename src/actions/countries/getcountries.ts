'use server'
import prisma from '@/lib/prisma';


export const countries=async ()=>{

     try {
        
        const countries=await prisma.countries.findMany({
         orderBy:{
            name:'asc'
         }
        });

       return countries;
     } catch (error) {
        console.log(error);
        return []
     }
}