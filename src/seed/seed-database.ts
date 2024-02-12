import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-countries";
import { Prisma } from "@prisma/client";

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

  //crear tallas
  await prisma.sizes.createMany({
    data: NewSizesHombre,
  });

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
  const sizesDB = await prisma.sizes.findMany();

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
