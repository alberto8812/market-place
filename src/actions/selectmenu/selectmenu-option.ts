'use server'

import prisma from "@/lib/prisma"

export const getCategoryAndSubcategory=async()=>{
    try {

 
       const getcategories= await prisma.category.findMany({
            select:{
                name:true,
                id:true,
                subCategory:{
                    select:{
                        name:true,
                        id:true
                    }
                },
                Product:{
                    take:1,
                    select:{
                        productImage:{
                            take:1,
                            select:{
                               url:true
                            },
                          
                        }
                    },
                    where:{
                        flatProduct:'true'
                    }
                }

            },
            

          });

 

         const data= getcategories.map(item=>{
             const {id,name,subCategory,Product}=item;

             return{
                id,
                name,
                subCategory,
                image:Product[0]?.productImage[0]?.url ?? ''
             }
          });

       
        return data;
   
        
    } catch (error) {
        throw (error)
    }
}