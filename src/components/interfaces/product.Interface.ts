

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
  inventory?: Inventory[];
  // type: Type;
  gender: Gender;
  category?: Category; //agregado
  subcategory?: subcategory;

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
  inStock?:number;
  sizeId?:string;
  idInventory:string
//todo quitar el id  y el instock 
}

export interface Category {
  id: string;
  name: string;
}

export interface subcategory {
  id: string;
  name: string;
}

export interface ProductImage {
  id: string;
  url: string;
}


export interface Inventory {
  inStock:number;
  sizesId:string;
  sizes:size
  id:string
}

interface size {
  size:Sizes 
  id:string
}

export type Gender = "mujer" | "hombre" | "kids" | "NA" | "unisex";
export type Sizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "NA";
export type Type = "shirts" | "pants" | "hoodies" | "hats";

export enum GenderEnum {
  hombre = "hombre",
  mujer = "mujer",
  kids = "kids",
  unisex = "unisex",
  NA = "NA",
}


