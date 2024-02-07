"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      include: {
        productImage: {
          select: {
            id: true,
            url: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
          },
        },
        inventory:{
          select:{
            id:true,
            inStock:true,
            sizesId:true,
            sizes:{
              select:{
                size:true,
                id:true
              }
            }

          }
        }

      },
      where: {
        slug,
      },
    });
    if (!product) return null;

    return {
      ...product,
      images: product.productImage.map((image) => image.url),
      priceSale:product.price *(1-(product.sale)),
    };
  } catch (error) {
    throw new Error(" Error al obtner producto por slug");
  }
};

export const getProductAdmindBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      include: {
        productImage: true,
        inventory:{
          select:{
            id:true,
            inStock:true,
            sizesId:true,
            sizes:{
              select:{
                size:true,
                id:true
              }
            }

          }
        }
      },
      where: {
        slug,
      },
    });

    if (!product) return null;

   // const {productImage,...rest}=product;
    //console.log(inventory.map(invent=>({...invent,sizes:invent.sizes.size})) )
    
    return {
      ...product,
      images:product.productImage.map((image) => image.url),
      sale:product.sale * 100,
     // inventoryo:product.inventory.map(invent=>({...invent,sizes:invent.sizes.size})) 
    };
  } catch (error) {
    throw new Error(" Error al obtner producto por slug");
  }
};
