"use client";

import { createupdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import {
  
  GarmentType,
  Product,
  ProductImage as ProductWithImage,
  Size,
  SizeCategory,
  Sizes,
  Subcategory,

} from "@/components/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


// export interface Inventory {
//   inStock: number;
//   id: string;
//   sizesId: string;
//   sizes: Sizes;
// }
// interface InProd {
//   idInvetory:string;
//   quantity:number
// }

interface Categories {
  id: string;
  name: string;
  subCategory: Subcategory[];
}


interface Props {
  product: Partial<Product> & {
    productImage?: ProductWithImage[] /*,inventoryo?:Inventory*/;
  };
  categories: Categories[] ;
  garmentTypes:GarmentType[];
  sizeCategories:SizeCategory[] ;
  allSizes:Size[]
}


interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string; //camisa,t-shirt
  gender: "mujer" | "hombre" | "kids" | "NA" | "unisex";
  categoryId: string;
  subCategoryId: string;
  flatProduct: string;
  inventory: { [key: string]: {idInvetory:string,quantity:number } };
  images?: FileList;
  sale:number;
  garmentTypesId:string;
  sizeCategoriesId:string
}



const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories,garmentTypes,sizeCategories,allSizes }: Props) => {
  const inventory= product?.inventory?.map(invent=>({...invent,sizes:invent.sizes.size})) ?? []
  const defaultInventory: { [key: string]:{idInvetory:string,quantity:number } } = Object.fromEntries(
    sizes.map((size) =>{
      const inventoryProduct=inventory.find(data=>data.sizes===size);
      return [size, {idInvetory:inventoryProduct?.id || '',quantity:0}]

    })
  ) ;


  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(","),
      sizes: product.sizes ?? [],
      inventory: defaultInventory,
      garmentTypesId:'',
      sizeCategoriesId:'',
      //todo images
      images: undefined,
    },
  });
  const selectedValue = watch("categoryId");
  const selectedgarmentTypesId = watch("garmentTypesId");
  const selectedsizeCategories = watch("sizeCategoriesId");
  watch("sizes");
  watch("inventory");


  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  };

  const onSizeQuantityChange = (size: string,idInvetory:string, quantity: string) => {
    const parsedQuantity = +quantity;
    if (!isNaN(parsedQuantity)) {
      setValue(`inventory.${size}`, { idInvetory, quantity: parsedQuantity });
    };
  };

  const onSubmit = async (data: FormInputs) => {
    console.log(data, "data");
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("subCategoryId", productToSave.subCategoryId);
    formData.append("gender", productToSave.gender);
    formData.append("flatProduct", productToSave.flatProduct);
    formData.append("inventory",JSON.stringify( productToSave.inventory));
    formData.append("sale", productToSave.sale.toString());
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    };


    const { ok, product: productRespond } =await createupdateProduct(formData);

    if (!ok) {
      alert("producto no se pudo actualizar ");
      return;
    }

    router.replace(`/admind/product/${productRespond?.slug}`);
  };


  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    >
      <div       className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>
        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>
        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        <div className="flex flex-col mb-2">
          <span>Precio</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>
        <div className="flex flex-col mb-2">
          <span>Oferta (%)</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("sale", { required: true, min: 0,max:100 })}
          />
        </div>
        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>
        <div className="flex flex-col mb-2">
          <span>Genero</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="kids">Niño</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((categorie) => (
              <option value={categorie.id} key={categorie.id}>
                {categorie.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <span>Subcategoria</span>

          {selectedValue ? (
            <select
              className="p-2 border rounded-md bg-gray-200"
              {...register("subCategoryId", { required: true })}
            >
              <option value="">[Seleccione]</option>

              {categories
                .filter((category) => category.id === selectedValue)[0]
                .subCategory?.map((subcategorie) => (
                  <option value={subcategorie.id} key={subcategorie.id}>
                    {subcategorie.name}
                  </option>
                ))}
            </select>
          ) : (
            <div className="p-2 border rounded-md bg-gray-200 h-10"></div>
          )}
        </div>

   {/* tipos de prenda */}
   <div className="flex flex-col mb-2">
          <span>GeneroPrenda</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("sizeCategoriesId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {sizeCategories.map((sizeCategory) => (
              <option value={sizeCategory.id} key={sizeCategory.id}>
                {sizeCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tipo de prenda</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("garmentTypesId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {garmentTypes.map((garmentType) => (
              <option value={garmentType.id} key={garmentType.id}>
                {garmentType.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <div className="flex flex-col mb-2">
            <span> Flat habilitar producto</span>
            <div className="flex  justify-start  ">
              <div
                className={clsx(
                  "flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 w-40",
                  {
                    "bg-green-500 text-white font-bold":
                      product.flatProduct == "true",
                  }
                )}
              >
                <input
                  id="bordered-radio-1"
                  type="radio"
                  {...register("flatProduct")}
                  value={"true"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Habilitado
                </label>
              </div>

              <div
                className={clsx(
                  "flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700  w-40",
                  {
                    "bg-red-500 text-white font-bold":
                      product.flatProduct == "false",
                  }
                )}
              >
                <input
                  id="bordered-radio-1"
                  type="radio"
                  {...register("flatProduct")}
                  value={"false"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No Habilitado
                </label>
              </div>
            </div>
          </div>

          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                className={clsx(
                  "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  }
                )}
                onClick={() => onSizeChange(size)}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpg image/avif"
              {...register("images")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center ">
            {product.productImage?.map((image) => (
              <div className="" key={image.id}>
                <ProductImage
                  alt={product.title ?? ""}
                  width={300}
                  height={300}
                  src={image.url}
                  className="rounded-t shadow-md "
                />
                <div className=" w-full flex justify-start">
                  <button
                    className="btn-danger rounded-b-xl w-fit  sm:w-full lg:w-full  "
                    type="button"
                    onClick={() => deleteProductImage(image.id, image.url)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
        
      </div>
      
     </div>
     {/* esto es un prueba  de tablas  */}
     <div className="overflow-x-auto w-full ">
      {selectedgarmentTypesId  && selectedsizeCategories &&(

            <table>
            <thead className="bg-gray-200 border-b">
                    <tr>
                      <th className="border-y border-gray-100 bg-gray-50/50 p-2">
                        Detalles
                      </th>
                      {allSizes.filter((size) => size.garmenttypeId === selectedgarmentTypesId &&  size.sizeCategoryId === selectedsizeCategories)
                      .map((sizeChoose) =>(
                        <th
                        key={sizeChoose.id}
                        className="border-y border-gray-100 bg-gray-50/50 p-2"
                      >
                        {sizeChoose.size}
                      </th>
                        
                      ))}

                    </tr>
                  </thead>
            </table>
      )}
{/* fin pureba  */}
     </div>

        <div className="overflow-x-auto w-full ">
          <table className=" border-collapse border border-gray-300 w-full">
            <thead className="bg-gray-200 border-b">
              <tr>
                <th className="border-y border-gray-100 bg-gray-50/50 p-2">
                  Detalles
                </th>
                {sizes.map((size) => (
                  <th
                    key={size}
                    className="border-y border-gray-100 bg-gray-50/50 p-2"
                  >
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border border-gray-300 px-4 py-2">Inventario</td>
                {sizes.map((size,index) => {
                  const inventoryProduct=inventory.find(data=>data.sizes===size)
                  if(inventoryProduct) return <td className="border border-gray-300 px-4 py-2" key={inventoryProduct.sizesId}>{inventoryProduct.inStock}</td>
                  return <td className="border border-gray-300 px-4 py-2" key={index}>0</td>

                    })
              }
              </tr>
              <tr className="text-center">
                <td className="border border-gray-300 px-4 py-2">Actualizar</td>

                {sizes.map((size,index) => {
                  const inventoryProduct=inventory.find(data=>data.sizes===size)
                  if(inventoryProduct) return (
                  <td className="border border-gray-300 px-4 py-2" key={inventoryProduct.sizesId} >                 
                   <input 
                  className="p-1 rounded border bg-white w-16" 

                   value={getValues(`inventory.${size}.quantity`)}
                   onChange={(e) => onSizeQuantityChange(size,inventoryProduct.id,e.target.value)}
                  /> 
                  </td>)
                  return (
                    <td className="border border-gray-300 px-4 py-2" key={`${index}_${size}`} >                 
                     <input

                     className="p-1 rounded border bg-white w-16" 
                     value={getValues(`inventory.${size}.quantity`)}
                     onChange={(e) => onSizeQuantityChange(size,'',e.target.value)}
                    /> 
                    </td>)

                    })
              }
              
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-5">

        <button className="btn-primary w-56">Guardar</button>
        </div>
    </form>
  );
};
