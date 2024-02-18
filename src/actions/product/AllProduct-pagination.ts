"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { getServerSession } from "next-auth";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedAllProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  
//  const session = await getServerSession(authOptions);




  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        productImage:{
          take: 2,
          select: {
            url: true,
          },
        },
        category:{
           select:{
            name:true
           }
        },
        subcategory:{
            select:{
                name:true
            }
        }
      },

      where: {
        gender: gender,
      },
      orderBy:{
        title:'desc'
      }
    });

    // 2. Obtener el total de páginas
    const totalCount = await prisma.product.count({
      where: {
        gender: gender,
      },
    });
    
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.productImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.log(error)
    throw new Error("No se pudo cargar los productos");
  }
};