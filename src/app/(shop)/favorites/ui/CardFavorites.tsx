"use client";
import { getFavoritesProduct } from "@/actions";
import { titleFont } from "@/app/config/fonts";
import { CardFavorite, ProductImage } from "@/components";
import { Product } from "@/components/interfaces";
import { useFavoritesStore } from "@/store";
import { currencyFormat } from "@/util";
import Link from "next/link";
import { useEffect, useState } from "react";


interface priceSale extends Product {
  priceSale:number ,
}


export const CardFavorites = () => {
  const favoritesProduct = useFavoritesStore((state) => state.favorites);
  const updateFavorite = useFavoritesStore((state) => state.updatefavorites);
  const deletefavorites = useFavoritesStore((state) => state.deletefavorites);
  const [products, setProducts] = useState<priceSale[] | null>();
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    const getFavoritePraducts = async () => {
      setloaded(true);
      const { productFavorites } = await getFavoritesProduct(favoritesProduct);
      setloaded(false);
      setProducts(productFavorites);
    };
    getFavoritePraducts();
  }, [favoritesProduct]);


  const onClickFavorites=(id:string, status:boolean)=>{

    if(status){
      updateFavorite(id)
      return;
    }

    deletefavorites(id);

 }

  if (loaded) {
    return <div className="h-screen"><p>Loading...</p></div>;
  }
  if (!products) {
    return <div className="h-screen"><p>Loading...</p></div>;
  }
  if (products.length<=0) {
    return <div className="h-screen"><p>Loading...</p></div>;
  }
    // TODO pendiente paginar  y colocar cavoritos

  return (
    <>
      {products ?
        products.map((product) => (
          <div className="m-10 mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8 w-screen" key={product.slug}> 
            <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80  ">

              <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
                
                <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">
                 {product.title.length>25? product.title.slice(0,20) + ' ...':product.title}
                </h2>
                <p>
                    <span className="text-3xl font-bold text-slate-900">${product.priceSale.toFixed(2)}</span>
                    {product.sale>0  &&
                    (<span className="text-sm text-slate-900 line-through ml-3">${product.price}</span>)
                    }
                  </p>
                <p className="mt-4 mb-8 max-w-md text-gray-500">
                  {product.description.length>80 ? product.description.slice(0,80) + '...':product.description}
                </p>
                <div className="flex justify-between">
                    <Link
                    href={`/product/${product.slug}`}
                    className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
                    >
                    <h5
                        className={`"group flex w-full items-center justify-center rounded py-1 text-center font-bold ${titleFont.className} hover:underline hover:text-blue-500`}
                    >
                        Comprar
                    </h5>
                    </Link>
                    <CardFavorite id={product.id}/>
                </div>
              </div>
              <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2  lg:w-2/5" >
                <ProductImage
                  className="h-full w-full object-cover  "
                  width={300}
                  height={300}
                  alt="practica"
                  src={product.images?product.images[0]:''}
                
                />
              </div>
              
            </div>
          </div>
        )):(<div className="h-screen"><p>Loading...</p></div>)
    }
    </>
  );
};
