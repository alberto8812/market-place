'use server'
import prisma from "@/lib/prisma";



export const getFavoritesProduct=async(productsIds:string[])=>{

    try {

        const products= await prisma.product.findMany(
            {
                select:{
                    id:true,
                    description:true,
                    inStock:true,
                    price:true,
                    sizes:true,
                    slug:true,
                    tags:true,
                    title:true,
                    gender:true,
                    //category:true,
                    //subcategory:true,
                    categoryId:true,
                    subCategoryId:true,
                    flatProduct:true,
                    sale:true,
                    productImage:{
                        take:1,
                        select:{
                            url:true,
                            id:true
                        }
                    }
                },
                where:{
                    id:{
                        in:productsIds
                    }
                }
            }
        );
         const productFaborites=products.map(product=>({
            ...product,
            images:product.productImage.map(image=>image.url)
        }))

          
        return {
            productFaborites
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message:'No se pueden mostrar los productos favoritos'
        }
    }
};