import prisma from "@/lib/prisma";

export const getAllCategories = async () => {

  try {
      const getCategories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          subCategory: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
  
   
      return getCategories

  } catch (error) {
    console.log(error);
    throw new Error('No se encontraron categorias existentes')
  }

};

export const getAllSubCategories = async () => {

  try {
      const getCategoriesSubCategory = await prisma.subCategory.findMany({
        select: {
          id: true,
          name: true,
        },
      });
  
   
      return getCategoriesSubCategory

  } catch (error) {
    console.log(error);
    throw new Error('No se encontraron subvategory existentes')
  }

};

