export const revalidate = 60;///60 segundos

import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductCardHome, Title } from "@/components";



interface Props{
  params:{
    category:string;
    
  },
  searchParams:{
    page?:string
  }

}



export default async function CategoryPage({params,searchParams}:Props) {
  const {category}=params;
  const page=searchParams.page? parseInt(searchParams.page):1;
  const getProductCategory= await getPaginatedProductsWithImages({page,category});

  const [categoryName,subcategoryName]=params.category.split('_');
  const Categorydecode=decodeURIComponent(categoryName);
  const subcategorydecode=decodeURIComponent(subcategoryName);

  


   if(getProductCategory?.products.length===0){
    redirect(`/category/${ category }`);
   }



  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" w-full pl-4">
         <Title title={Categorydecode} subtitle={subcategorydecode}/>
      </div>
      <div className=' grid grid-cols-1 sm:grid-cols-3  justify-evenly   p-5   gap-4 items-center '>
          {
            
            getProductCategory?.products.map(product=>(
              <ProductCardHome product={product} key={product.slug}/>
            ))
          
            }

        
      </div>

            <Pagination totalPages={getProductCategory?.toltalPage??1}/>
    </div>
  );
}