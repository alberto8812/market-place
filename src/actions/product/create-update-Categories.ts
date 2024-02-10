
'use server'
import prisma from "@/lib/prisma";
import {z } from "zod";

interface createSubcategori{
    idCategory:string,
    idSubCategory:string,
}
// todo pendiento hacer el update oganizar mejor
export const UpdateCategories = async ({idCategory,idSubCategory}:createSubcategori) => {

   

 try {
    const createSubcategori= prisma.category.update({
        where:{
            id:idCategory,
        },
        data:{
            subCategory:{
                connect: {
                    id:idSubCategory
                }
            }
        },

    });

    return createSubcategori
    
 } catch (error) {
    console.log(error);
    throw new Error( 'No se pudo crear la subcategoria')
 }
 
}


interface createSubCategories{
    idCategory:string,
    nameSubCategory:string,
}

export const createSubCategories = async ({idCategory,nameSubCategory}:createSubCategories) => {

    try {
       const createSubcategori= prisma.subCategory.create({
           data:{
                name:nameSubCategory,
               category:{
                   connect: {
                       id:idCategory
                   }
               }
           },
   
       });
       console.log(createSubcategori)
       return createSubcategori
       
    } catch (error) {
       console.log(error);
       throw new Error( 'No se pudo crear la subcategoria')
    }
    
   }
   
