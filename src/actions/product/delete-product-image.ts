'use server'
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage=async(imageId:string,imageUrl:string)=>{

    if(!imageUrl.startsWith('http')){
        return {
            ok:false,
            error:'No se pueden borrar imagenes de FS'
        }
    }

    const imageName=imageUrl.split('/').at(-1)?.split('.')[0] ?? '';


    try {
        await cloudinary.uploader.destroy(`shopStore/${imageName}`)
        const deletedImage=await prisma.productImage.delete({
            where:{id:imageId},
            select:{
             Product:{
                select:{
                    slug:true
                }
             }    
            }
        });


        //REVALIDAR PATH

        revalidatePath(`/admind/products`)
        revalidatePath(`/admind/products/${deletedImage.Product.slug}`);
        revalidatePath(`/products/${deletedImage.Product.slug}`);


    } catch (error) {
        console.log(error);
        return {
            ok:true,
            message:'No se pudo eliminar la imagen'
        }
    }

};

