"use server";
import { GenderEnum, Product, Sizes } from "@/components/interfaces";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { object, z } from "zod";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const allowedSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  sizes: z.coerce.string().transform((vale) => vale.split(",")),
  tags: z.string(),
  categoryId: z.string().uuid(),
  subCategoryId: z.string().uuid(),
  gender: z.nativeEnum(GenderEnum),
  flatProduct: z.string(),
  inventory: z.object(
    Object.fromEntries(
      allowedSizes.map((size) => [
        size,
        z.object({
          idInvetory: z.string(),
          quantity: z.number().int().min(0),
        }),
      ])
    )
  ),
});

interface AddOldInventory {
  InvetoryId: string;
  quantity: number;
}
interface newInventory {
  sizesId: string;
  quantity: number;
}

export const createupdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  if (typeof data.inventory === "string")
    data.inventory = JSON.parse(data.inventory);

  const productParsed = productSchema.safeParse(data);

  //console.log(productParsed.error)
  //console.log(productParsed?.error)

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
    };
  }

  const product = productParsed.data;

  product.slug = product.slug.toLocaleLowerCase().replace(/ /g, "-").trim();

  const { id, inventory, ...rest } = product;
  //todo en este punto es para organizar por cantidad

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const newInventory: newInventory[] = [];
      const addOldInventory: AddOldInventory[] = [];
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLocaleLowerCase());
      const sizesCode = await tx.sizes.findMany();

      for (const property in inventory) {
        if (inventory[property].quantity > 0) {
          sizesCode.map((sizes) => {
            if (
              sizes.size === property &&
              inventory[property].idInvetory !== ""
            ) {
              addOldInventory.push({
                InvetoryId: inventory[property].idInvetory,
                quantity: inventory[property].quantity,
              });
              return;
            } else if (
              sizes.size === property &&
              inventory[property].idInvetory === ""
            ) {
              newInventory.push({
                sizesId: sizes.id,
                quantity: inventory[property].quantity,
              });
              return;
            }
            return;
          });
        }
      }


      
      if (id) {
        //actualizar
        // todo pendinete validar path http://localhost:3000/category/kids_shirts
        //todo si no se quiere modificar el inventario
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Sizes[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

        if(newInventory.length>0){
          const inventoryAddProductId=newInventory.map(inventory=>({sizesId:inventory.sizesId,productId:product.id,inStock:inventory.quantity}));
          await tx.inventory.createMany({
            data:inventoryAddProductId
          })
        }
        
        addOldInventory.forEach(async(inventory) => {
          await tx.inventory.update({
            where:{
              id:inventory.InvetoryId
            },
            data:{
              inStock:{
                increment:inventory.quantity
              }
            }
          })
       });
      } else {
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Sizes[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

        const inventoryAddProductId=newInventory.map(inventory=>({sizesId:inventory.sizesId,productId:product.id,inStock:inventory.quantity}));
        await tx.inventory.createMany({
          data:inventoryAddProductId
        })
      }

      //proceso de carfga y guardado de images
      //recorrer imagens y guardarlas
      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        
        if (!images) {
          throw new Error("Nose pudo cargar las images,rollingback");
        }
        console.log('carlos 1');
        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            ProductId: product.id,
          })),
        });

      }

      return {
        product,
      };
    });

    const { product } = prismaTx;
    //Revalidacion
    revalidatePath("/admind/products");
    revalidatePath(`/admind/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);

    return {
      ok: true,
      product,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo registrar el producto",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const upLoadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64"); //convierte la imagen en un string

        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64Image}`,
          { folder: "shopStore" }
        );
        return result.secure_url;
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(upLoadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
