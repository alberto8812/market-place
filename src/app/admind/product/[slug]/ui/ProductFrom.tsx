"use client";
// todo ojo la talba d dallas  cuando se crea un nueva  se debe recargar asigne los Id
import { deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import {
  GarmentType,
  Product,
  ProductImage as ProductWithImage,
  Size,
  SizeCategory,
  Subcategory,
} from "@/components/interfaces";
import { useProductSizeFrom, useProudctFrom } from "@/hooks/admin";
import clsx from "clsx";
import { useEffect } from "react";

interface Categories {
  id: string;
  name: string;
  subCategory: Subcategory[];
}

interface Props {
  product: Partial<Product> & {
    productImage?: ProductWithImage[];
    /*,inventoryo?:Inventory*/
  } & { garmentTypesId?: string } & { sizeCategoriesId?: string };
  categories: Categories[];
  garmentTypes: GarmentType[];
  sizeCategories: SizeCategory[];
  allSizes: Size[];
}

export const ProductForm = ({
  product,
  categories,
  garmentTypes,
  sizeCategories,
  allSizes,
}: Props) => {
  const { inventory, loadSizes, setLoadSizes } = useProductSizeFrom({
    product,
  });

  const {
    handleSubmit,
    register,
    isValid,
    getValues,
    setValue,
    watch,

    //observadores--
    selectedValue,
    selectedgarmentTypesId,
    selectedsizeCategories,

    //funciones
    onSizeChange,
    onSizeQuantityChange,
    onSubmit,
  } = useProudctFrom({ product });

  useEffect(() => {
    let sizes = allSizes.filter(
      (size) =>
        size.garmenttypeId === selectedgarmentTypesId &&
        size.sizeCategoryId === selectedsizeCategories
    );
    setLoadSizes(sizes);
  }, [selectedgarmentTypesId, selectedsizeCategories]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
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
              {...register("sale", { required: true, min: 0, max: 100 })}
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
              {loadSizes.map((size) => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div
                  key={size.id}
                  className={clsx(
                    "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                    {
                      "bg-blue-500 text-white": getValues("sizes").includes(
                        size.size
                      ),
                    }
                  )}
                  onClick={() => onSizeChange(size.size)}
                >
                  <span>{size.size.split("_")[1]}</span>
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
        {selectedgarmentTypesId && selectedsizeCategories && (
          <table>
            <thead className="bg-gray-200 border-b">
              <tr>
                <th className="border-y border-gray-100 bg-gray-50/50 p-2">
                  Detalles
                </th>
                {loadSizes.map((sizeChoose) => (
                  <th
                    key={sizeChoose.id}
                    className="border-y border-gray-100 bg-gray-50/50 p-2"
                  >
                    {sizeChoose.size.split("_")[1]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border border-gray-300 px-4 py-2">Inventario</td>
                {loadSizes.map((size) => {
                  const inventoryProduct = inventory.find(
                    (data) => data.sizes === size.size
                  );
                  if (inventoryProduct)
                    return (
                      <td
                        className="border border-gray-300 px-4 py-2"
                        key={inventoryProduct.sizesId}
                      >
                        {inventoryProduct.inStock}
                      </td>
                    );
                  return (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      key={size.id}
                    >
                      0
                    </td>
                  );
                })}
              </tr>
              <tr className="text-center">
                <td className="border border-gray-300 px-4 py-2">Actualizar</td>

                {loadSizes.map((size, index) => {
                  const inventoryProduct = inventory.find(
                    (data) => data.sizes === size.size
                  );
                  if (inventoryProduct) {
                    return (
                      <td
                        className="border border-gray-300 px-4 py-2"
                        key={`${index}_${size}`}
                      >
                        <input
                          className="p-1 rounded border bg-white w-16"
                          value={getValues(`inventory.${size}.quantity`)}
                          onChange={(e) =>
                            onSizeQuantityChange(
                              size.id,
                              inventoryProduct.id,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  }
                  return (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      key={`${index}_${size}`}
                    >
                      <input
                        className="p-1 rounded border bg-white w-16"
                        value={getValues(`inventory.${size}.quantity`)}
                        onChange={(e) =>
                          onSizeQuantityChange(size.id, "", e.target.value)
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        )}
        {/* fin pureba  */}
      </div>
      <div className="flex justify-center mt-5">
        <button className="btn-primary w-56">Guardar</button>
      </div>
    </form>
  );
};
