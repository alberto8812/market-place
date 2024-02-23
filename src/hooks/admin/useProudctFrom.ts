import { createupdateProduct } from "@/actions";
import {
  Product,
  ProductImage as ProductWithImage,
} from "@/components/interfaces";
import { useRouter } from "next/navigation";
import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

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
  inventory: { [key: string]: { idInvetory: string; quantity: number } };
  images?: FileList;
  sale: number;
  garmentTypesId: string;
  sizeCategoriesId: string;
}

interface PorpsHook {
  product: Partial<Product> & {
    productImage?: ProductWithImage[];
    /*,inventoryo?:Inventory*/
  } & { garmentTypesId?: string } & { sizeCategoriesId?: string };
}

export const useProudctFrom = ({ product }: PorpsHook) => {
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
      inventory: {},
      garmentTypesId: product.garmentTypesId,
      sizeCategoriesId: product.sizeCategoriesId,
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

  const onSizeQuantityChange = (
    size: string,
    idInvetory: string,
    quantity: string
  ) => {
    const parsedQuantity = +quantity;
    if (!isNaN(parsedQuantity)) {
      setValue(`inventory.${size}`, { idInvetory, quantity: parsedQuantity });
    }
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
    formData.append("inventory", JSON.stringify(productToSave.inventory));
    formData.append("sale", productToSave.sale.toString());
    formData.append("garmentTypesId", productToSave.garmentTypesId);
    formData.append("sizeCategoriesId", productToSave.sizeCategoriesId);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: productRespond } = await createupdateProduct(formData);

    if (!ok) {
      alert("producto no se pudo actualizar ");
      return;
    }

    router.replace(`/admind/product/${productRespond?.slug}`);
  };

  return {
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
  };
};
