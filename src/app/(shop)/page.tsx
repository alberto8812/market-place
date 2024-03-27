export const revalidate = 60; ///60 segundos
import { SlideShowImage } from "@/components";
import { ProductCardHome } from "@/components/product/productCardhome/ProductCardHome";
import { titleFont } from "../config/fonts";
import { getHomeProductsWithImages } from "@/actions";
import { BackGroundAnimation } from "@/components/backGourndAnimation/BackGroundAnimation";

export default async function Home() {
  const { products: productHome, ok } = await getHomeProductsWithImages();
  //const productPaginateDB= await getPaginatedProductsWithImages();

  return (
    <>
      <SlideShowImage />

      <div className="relative flex flex-col justify-cente items-center overflow-hidden ">
        <BackGroundAnimation />
        {productHome?.map((category) => {
          if (category.product.length)
            return (
              <div key={category.name} className="">
                <div className="flex flex-col justify-center items-center relative  z-10  m-2 p-5">
                  <div className="flex justify-center  items-centerm-2  mb-3">
                    <span
                      className={`${titleFont.className}  text-2xl text-[rgba(0,81,89,255)] font-bold p-4 border  border-[rgba(0,81,89,255)] rounded-3xl`}
                    >
                      {category.name}
                    </span>
                  </div>
                  <div className=" w-80 justify-center flex  bg-gray-400 items-center">
                    <hr className="bg-gray-400 h-1" />
                  </div>
                </div>

                <div className=" grid grid-cols-1 sm:grid-cols-3  sm:justify-evenly    p-5   gap-10  items-center justify-center ">
                  {category.product?.map((product) => (
                    <ProductCardHome product={product} key={product.slug} />
                  ))}
                  {category.product?.map((product) => (
                    <ProductCardHome product={product} key={product.slug} />
                  ))}
                  {category.product?.map((product) => (
                    <ProductCardHome product={product} key={product.slug} />
                  ))}
                </div>
              </div>
            );
        })}
      </div>
    </>
  );
}
