
export interface SubCategory {
    id:string,
    name:string
  }
  
  export interface CategoriesSubcategories{
    id:string,
    name:string
    subCategory:SubCategory[],
    image?:string
  }