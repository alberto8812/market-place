'use server'

import prisma from "@/lib/prisma";


interface Pagination {
    page?:number;
    take?:number;
    category?:string ,

}


export const getPaginatedProductsWithImages= async({page=1,take=12,category=''}:Pagination)=>{

    
    const  [categoryName,subcategoryName]=category.split('_');
    const  categorydecode=decodeURIComponent(categoryName);
    const subcategorydecode=decodeURIComponent(subcategoryName);
    
    if(isNaN(Number(page)))page=1;
    if(page<1) page=1;
    console.log(category,'paso')
    try {

    const findoneCategory=await prisma.product.findMany({
        take:1,
        where:{
            category:{
                name:categorydecode
            },
            subcategory:{
                name:subcategorydecode
            }
        }
    })
      

    //    1.obtener los productos 
    if(findoneCategory.length){
        const products=await prisma.product.findMany({
      
            include:{
                productImage:{
                    take:2,
                    select:{
                        url:true
                    }
                }
                
            },

            take: take,
            skip:(page-1)*take,

            where:{
                category:{
                    name:categorydecode
                },
                subcategory:{
                    name:subcategorydecode
                },
                flatProduct:'true'

            }
  
        });

     

        //2.obtener el toalta de paginas
        //todo
        const totalCount= await prisma.product.count({
            
            where:{
                category:{
                    name:categorydecode
                },
                subcategory:{
                    name:subcategorydecode
                }
            }
        })
        const toltalPage=Math.ceil(totalCount/take)



        return{
        currentPage:page,
        toltalPage,
        products:products.map(product=>({
            ...product,
            images:product.productImage.map(image=>image.url),
            priceSale:product.price * (1-(product.sale*100/100)),
        }))
        }
    }
    throw new Error(`No se puedo cargar producto  con categoria ${categoryName} o subcategoria ${subcategoryName}`);
    } catch (error) {
        throw new Error(`No se puedo cargar producto  con categoria ${categoryName} o subcategoria ${subcategoryName} `);
    }
}