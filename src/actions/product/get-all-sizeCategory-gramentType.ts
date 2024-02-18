import prisma from "@/lib/prisma";

export const getAllSizeCategoryGramentType = async () => {
    try {
  
      const sizeCategory= await prisma.sizeCategory.findMany()
      const garmentType= await prisma.garmenttype.findMany()
  


      
      return {
        sizeCategory,
        garmentType

      };
    } catch (error) {
      throw new Error(" Error al obtner la prenda y categoria de tallas");
    }
  };
  