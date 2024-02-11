import { initialData } from './seed';
import prisma from '../lib/prisma';
import { countries } from './seed-countries';

async function main() {

  

    //1.borrar registros previos
        await prisma.orderAddress.deleteMany();
        await prisma.orderItem.deleteMany();
        await prisma.order.deleteMany();
        await prisma.comments.deleteMany();
        await prisma.inventory.deleteMany();
        await prisma.sizeCategory.deleteMany();
        await prisma.garmenttype.deleteMany();
        await prisma.sizes.deleteMany();
        await prisma.userAddress.deleteMany();
        await prisma.user.deleteMany();
        await prisma.countries.deleteMany();
        await prisma.productImage.deleteMany();
        await prisma.product.deleteMany();
        await prisma.category.deleteMany();
        await prisma.subCategory.deleteMany();


    const {categories,subCategories,products,seedUser,sizes}=initialData;
    


    const categoriesData2=categories.map(category=>({
        name:category
    }))

    const subCategoriesData2=subCategories.map(subCategory=>({
        name:subCategory
    }))

    //country
    await prisma.countries.createMany({data:countries})

   //SUBCATEGORI
    await prisma.subCategory.createMany({
       data:subCategoriesData2
    });

    const sizeCategoryIdHombre= await prisma.sizeCategory.create({
        data:{
            name:'hombre'
        }
    });
      
    const garmenttype= await prisma.garmenttype.create({
        data:{
            name:'camisa'
        }
    });
    const sizeCategoryIdMujer= await prisma.sizeCategory.create({
        data:{
            name:'mujer'
        }
    });
      




      
    const NewSizesHombre= sizes.map(size=>({...size,sizeCategoryId:sizeCategoryIdHombre.id,garmenttypeId:garmenttype.id}))
    const NewSizesmujer= sizes.map(size=>({...size,sizeCategoryId:sizeCategoryIdMujer.id,garmenttypeId:garmenttype.id}))
    //crear tallas 
    await prisma.sizes.createMany({
       data:NewSizesHombre

    });
    await prisma.sizes.createMany({
       data:NewSizesmujer

    });

        //categorias
     await prisma.category.createMany({
        data:categoriesData2
     });



     const categoryDB= await prisma.category.findMany();

     const categoriesMap=categoryDB.reduce((map,category)=>{
        map[category.name.toLocaleLowerCase()]=category.id
        return map

     },{} as Record<string,string>);

     //conseguir id se las tallas 
     const sizesDB= await prisma.sizes.findMany();

     const sizesMap=sizesDB.reduce((map,size)=>{
        map[size.size]=size.id
        return map

     },{} as Record<string,string>)
     
     


     const subcategoryDB= await prisma.subCategory.findMany();

     const subcategoriesMap=subcategoryDB.reduce((map,category)=>{
        map[category.name.toLocaleLowerCase()]=category.id
        return map

     },{} as Record<string,string>)


     products.forEach(async(product) => {

        const {type,images,...rest}=product;

        const dbproduct=await prisma.product.create({
            data:{
                ...rest,
                categoryId:categoriesMap[rest.gender],
                subCategoryId:subcategoriesMap[type]
            }
        })

        const updateCategory= await prisma.category.update({
            where:{
                id:dbproduct.categoryId
            },
            data:{
                subCategory:{
                    connect:{
                        id:dbproduct.subCategoryId
                    }
                }
            }
        })

        dbproduct.sizes.forEach(async(sizeSeed) => {

            const inventori= await prisma.inventory.create({
                data:{
                  inStock:dbproduct.inStock,
                  productId:dbproduct.id,
                  sizesId:sizesMap[sizeSeed]

                }
            })
        });
        
        //images
          
        const imagesData=images.map(image=>({
            url:image,
            ProductId:dbproduct.id

        }))

        await prisma.productImage.createMany({
            data:imagesData
        })

     });

     await prisma.user.createMany({
        data:seedUser
    })








    console.log("seed ejecutado")
    
}




(()=>{
    console.log("paso 1")
    if(process.env.NODE_ENV === 'production') return
    main();

})();