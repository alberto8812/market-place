import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-countries";
import { Prisma, Size } from '@prisma/client';

async function main() {
  //1.borrar registros previos
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.comments.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.sizes.deleteMany();
  await prisma.garmenttype.deleteMany();
  await prisma.sizeCategory.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.countries.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.subCategory.deleteMany();

  const {
    categories,
    subCategories,
    products,
    seedUser,
    camisaHombre,
    pantalonHombre,
    zapatosHombre,
    camisaMujer,
    pantalonMujer,
    zapatosMujer,
    camisaKids,
    pantalonKids,
    zapatosKids,
    noAplica,
    categorySize,
    garmenttypes
  } = initialData;

  const categoriesData2 = categories.map((category) => ({
    name: category,
  }));

  const subCategoriesData2 = subCategories.map((subCategory) => ({
    name: subCategory,
  }));

  //country
  await prisma.countries.createMany({ data: countries });

  //SUBCATEGORI
  await prisma.subCategory.createMany({
    data: subCategoriesData2,
  });

  //cargar Categoriesize an garment
  const categorySize2 = categorySize.map((categoris) => ({
    name: categoris,
  }));

const sizecategory= await await prisma.sizeCategory.createMany({
    data:categorySize2,


  });

  const garmenttypes2 = garmenttypes.map((garment) => ({
    name: garment,
  }));

const tupesGarment= await await prisma.garmenttype.createMany({
    data:garmenttypes2,
  });

    //fin cargar Categoriesize an garment

    //hombres 

  const sizeCategoryIdHombre = await prisma.sizeCategory.findFirst({
    where:{
      name:"hombre"
    }
  })

  const garmenttype = await prisma.garmenttype.findFirst({
    where: {
      name:"camisa"
    },
  });



  const NewSizesHombre = camisaHombre.map((size) => ({
    ...size,
    sizeCategoryId:sizeCategoryIdHombre?.id ?? 'NA', 
    garmenttypeId:garmenttype?.id ?? 'NA',
  }));

 
  const  createCamisaHombre=await prisma.sizes.createMany({
    data: NewSizesHombre,
  });
  

  //pantalones

  const garmenttypePantalonGombre = await prisma.garmenttype.findFirst({
    where: {
      name:"pantalon"
    },
  });



  const NewSizesHombrePantalon = pantalonHombre.map((size) => ({
    ...size,
    sizeCategoryId:sizeCategoryIdHombre?.id ?? 'NA', 
    garmenttypeId:garmenttypePantalonGombre?.id ?? 'NA',
  }));

 
  await prisma.sizes.createMany({
    data: NewSizesHombrePantalon,
  });

  // zapatos
  const garmenttypeZpatosGombre = await prisma.garmenttype.findFirst({
    where: {
      name:"zapatos"
    },
  });



  const NewSizesHombreZapatos = zapatosHombre.map((size) => ({
    ...size,
    sizeCategoryId:sizeCategoryIdHombre?.id ?? 'NA', 
    garmenttypeId:garmenttypeZpatosGombre?.id ?? 'NA',
  }));

 
  await prisma.sizes.createMany({
    data: NewSizesHombreZapatos,
  });


  // fin hombres

  //inicio mujeres 
  const sizeCategoryIdMujes= await prisma.sizeCategory.findFirst({
    where:{
      name:"mujer"
    }
  })

  const garmenttypeMujesCamisa = await prisma.garmenttype.findFirst({
    where: {
      name:"camisa"
    },
  });



  const NewSizesMujer = camisaMujer.map((size) => ({
    ...size,
    sizeCategoryId:sizeCategoryIdMujes?.id ?? 'NA', 
    garmenttypeId:garmenttypeMujesCamisa?.id ?? 'NA',
  }));

 
  await prisma.sizes.createMany({
    data: NewSizesMujer,
  });
  

  //pantalones

  const garmenttypePantalonMujer = await prisma.garmenttype.findFirst({
    where: {
      name:"pantalon"
    },
  });



  const NewSizesHombreMujer = pantalonMujer.map((size) => ({
    ...size,
    sizeCategoryId:sizeCategoryIdMujes?.id ?? 'NA', 
    garmenttypeId:garmenttypePantalonMujer?.id ?? 'NA',
  }));

 
  await prisma.sizes.createMany({
    data: NewSizesHombreMujer,
  });

  // zapatos
  const garmenttypeZpatosMujer = await prisma.garmenttype.findFirst({
    where: {
      name:"zapatos"
    },
  });



  const NewSizesMujerZapatos = zapatosMujer.map((size) => ({
    ...size,
    sizeCategoryId:sizeCategoryIdMujes?.id ?? 'NA', 
    garmenttypeId:garmenttypeZpatosMujer?.id ?? 'NA',
  }));

 
  await prisma.sizes.createMany({
    data: NewSizesMujerZapatos,
  });


  //fin mujeres

  //kids
  const sizeCategoryIdKids= await prisma.sizeCategory.findFirst({
    where:{
      name:"kids"
    }
  })

  const garmenttypeKidsCamisa = await prisma.garmenttype.findFirst({
    where: {
      name:"camisa"
    },
  });



  const NewSizesKids = camisaKids.map((size) => ({
    ...size,
    sizeCategoryId:sizeCategoryIdKids?.id ?? 'NA', 
    garmenttypeId:garmenttypeKidsCamisa?.id ?? 'NA',
  }));

 
  await prisma.sizes.createMany({
    data: NewSizesKids,
  });
  

  //pantalones

  const garmenttypePantalonKids = await prisma.garmenttype.findFirst({
    where: {
      name:"pantalon"
    },
  });



  const NewSizesHombreKids = pantalonKids.map((size) => ({
    ...size,
    sizeCategoryId:sizeCategoryIdKids?.id ?? 'NA', 
    garmenttypeId:garmenttypePantalonKids?.id ?? 'NA',
  }));

 
  await prisma.sizes.createMany({
    data: NewSizesHombreKids,
  });

  // zapatos
  const garmenttypeZpatosKis = await prisma.garmenttype.findFirst({
    where: {
      name:"zapatos"
    },
  });



  const NewSizesKidsZapatos = zapatosKids.map((size) => ({
    ...size,
    sizeCategoryId:sizeCategoryIdKids?.id ?? 'NA', 
    garmenttypeId:garmenttypeZpatosKis?.id ?? 'NA',
  }));

 
  await prisma.sizes.createMany({
    data: NewSizesKidsZapatos,
  });



  //fin kids

  //NA
  const sizeCategoryIdnA= await prisma.sizeCategory.findFirst({
    where:{
      name:"NA"
    }
  })

  const garmenttypeNA = await prisma.garmenttype.findFirst({
    where: {
      name:"NA"
    },
  });


 
  await prisma.sizes.create({
    data: {
      size:'NA',
      sizeCategoryId:sizeCategoryIdnA?.id ?? 'NA', 
      garmenttypeId:garmenttypeNA?.id ?? 'NA',

    },
  });
  

  //FIN NA



// repetir

  //categorias
  await prisma.category.createMany({
    data: categoriesData2,
  });

  const categoryDB = await prisma.category.findMany();

  const categoriesMap = categoryDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  //conseguir id se las tallas
  const sizesDB = await prisma.sizes.findMany({
    where:{
      sizeCategory:{
        name:'hombre'
      },
      garmenttype:{
        name:'camisa'
      }
    }
  });


  const sizesMap = sizesDB.reduce((map, size) => {
    map[size.size] = size.id;
    return map;
  }, {} as Record<string, string>);

  const subcategoryDB = await prisma.subCategory.findMany();

  const subcategoriesMap = subcategoryDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbproduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[rest.gender],
        subCategoryId: subcategoriesMap[type],
      },
    });

    const updateCategory = await prisma.category.update({
      where: {
        id: dbproduct.categoryId,
      },
      data: {
        subCategory: {
          connect: {
            id: dbproduct.subCategoryId,
          },
        },
      },
    });

    dbproduct.sizes.forEach(async (sizeSeed) => {
      const inventori = await prisma.inventory.create({
        data: {
          inStock: dbproduct.inStock,
          productId: dbproduct.id,
          sizesId: sizesMap[sizeSeed],
        },
      });
    });

    //images

    const imagesData = images.map((image) => ({
      url: image,
      ProductId: dbproduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  await prisma.user.createMany({
    data: seedUser,
  });

  console.log("seed ejecutado");
}

(() => {
  console.log("paso 1");
  if (process.env.NODE_ENV === "production") return;
  main();
})();
