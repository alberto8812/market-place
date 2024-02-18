export interface Product {
  id: string;
  description: string;
  images?: string[];
  inStock: number;
  price: number;
  sizes: Sizes[];
  slug: string;
  tags: string[];
  title: string;
  flatProduct: string;
  sale: number;
  inventory?: Inventory[];
  // type: Type;
  gender: Gender;
  category?: Category; //agregado
  subcategory?: Subcategory;

  categoryId: string;
  subCategoryId: string;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size?: Sizes;
  image: string;
  inStock?: number;
  sizeId?: string;
  idInventory: string;
  sale: number;
  priceSale: number;
  //todo quitar el id  y el instock
}

export interface Category {
  id: string;
  name: string;
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface Inventory {
  inStock: number;
  sizesId: string;
  sizes: Size;
  id: string;
}

export interface Size {
  size: Sizes;
  id: string;
  sizeCategoryId?:string;
  garmenttypeId?:string;
  
}

export interface GarmentType{
  id:string;
  name:GarmentTypes
}
export interface SizeCategory{
  id:string;
  name:SizeCategories
}

export type Gender = "mujer" | "hombre" | "kids" | "NA" | "unisex";
export type Sizes =
  | "CA_XS"
  | "CA_S"
  | "CA_M"
  | "CA_L"
  | "CA_XL"
  | "CA_XXL"
  | "CA_XXXL"
  | "NA"
  // PANTALONES  ADULTOS HOMBRE
  | "HP_28"
  | "HP_30"
  | "HP_32"
  | "HP_34"
  | "HP_36"
  | "HP_38"
  // PANTALONES  ADULTOS mujer
  | "MP_4"
  | "MP_6"
  | "MP_8"
  | "MP_10"
  | "MP_12"
  | "MP_14"
  //ZAPTOS ADOULTOS
  | "ZA_36"
  | "ZA_37"
  | "ZA_38"
  | "ZA_39"
  | "ZA_40"
  | "ZA_41"
  | "ZA_42"
  | "ZA_43"

  //TALLA CAMISAS NINOS
  | "NC_4"
  | "NC_6"
  | "NC_8"
  | "NC_10"
  | "NC_12"
  | "NC_14"

  // TALLA ZAPATOS NINOS
  | "NZ_28"
  | "NZ_29"
  | "NZ_30"
  | "NZ_31"
  | "NZ_32"
  | "NZ_33"
  | "NZ_34";

export type Type = "shirts" | "pants" | "hoodies" | "hats";

export enum GenderEnum {
  hombre = "hombre",
  mujer = "mujer",
  kids = "kids",
  unisex = "unisex",
  NA = "NA",
}


 type GarmentTypes =
  | "camisa"
  | "pantalon"
  | "zapatos"
  | "NA";

 type SizeCategories =
  |"hombre"
  |"mujer"
  |"kids"
  |"NA";

  export const allSizes =[
    "CA_XS"
    ,"CA_S"
    ,"CA_M"
    ,"CA_L"
    ,"CA_XL"
    ,"CA_XXL"
    ,"CA_XXXL"
    ,"NA"
  // PANTALONES  ADULTOS HOMBRE
    ,"HP_28"
    ,"HP_30"
    ,"HP_32"
    ,"HP_34"
    ,"HP_36"
    ,"HP_38"
  // PANTALONES  ADULTOS mujer
    ,"MP_4"
    ,"MP_6"
    ,"MP_8"
    ,"MP_10"
    ,"MP_12"
    ,"MP_14"
  //ZAPTOS ADOULTOS
    ,"ZA_36"
    ,"ZA_37"
    ,"ZA_38"
    ,"ZA_39"
    ,"ZA_40"
    ,"ZA_41"
    ,"ZA_42"
    ,"ZA_43"

  //TALLA CAMISAS NINOS
    ,"NC_4"
    ,"NC_6"
    ,"NC_8"
    ,"NC_10"
    ,"NC_12"
    ,"NC_14"

  // TALLA ZAPATOS NINOS
  ,"NZ_28"
  ,"NZ_29"
  ,"NZ_30"
  ,"NZ_31"
  ,"NZ_32"
  ,"NZ_33"
  ,"NZ_34"]
