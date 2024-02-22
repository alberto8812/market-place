export const revalidate = 604800; //7valida el producto en 7 dias

import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import { getProductBySlug } from "@/actions";
import { titleFont } from "@/app/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StokcLabel,
} from "@/components";

import { IoHeart } from "react-icons/io5";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  const product = await getProductBySlug(slug);
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrados",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrados",
      description: product?.description ?? "",
      images: [`/products/${product?.images}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const getProduct = await getProductBySlug(slug);

  if (!getProduct) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-3  ">
      <div className="col-span-1 md:col-span-2  ">
        {/* slideshow mobile */}
        <ProductMobileSlideshow
          images={getProduct.images}
          title={getProduct.title}
          className="block md:hidden"
        />
        {/* slideshow escritorio */}
        <ProductSlideshow
          images={getProduct.images}
          title={getProduct.title}
          className="hidden md:grid "
        />
      </div>
      {/* detalles */}
      <div className="col-span-1 px-5   md:grid-cols-2 lg:pt-2">
        <StokcLabel slug={getProduct.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-4xl`}>
          {getProduct.title}
        </h1>
        <div className="flex items-center pt-5">
          <IoHeart size={30} className="text-gray-400" />
          <span className="mr-2 ml-3 rounded bg-gray-200 px-2.5 py-0.5 text-xs  font-bold">
            5.0
          </span>
        </div>
        <div className="flex justify-between items-center w-full"></div>
        <p>
          <span className="text-3xl font-bold text-slate-900">
            ${getProduct.priceSale.toFixed(2)}
          </span>
          {getProduct.sale > 0 && (
            <span className="text-sm text-slate-900 line-through ml-3">
              ${getProduct.price}
            </span>
          )}
        </p>

        <AddToCart product={getProduct} />

        {/* descripcion */}
        <h3 className="font-bold text-2xl">Descripcion</h3>
        <p className="text-1xl">{getProduct.description}</p>
      </div>
    </div>
  );
}
