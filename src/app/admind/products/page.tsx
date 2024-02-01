
import { Pagination, ProductImage, Title } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { OrderSelectStatus } from "./ui/OrderSelectStatus";
import { getPaginatedAllProductsWithImages } from "@/actions";
import { currencyFormat } from "@/util";

interface Props {
  searchParams:{
    page?:string;
  }
}

export default async function AdmindOrders({searchParams}:Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =await getPaginatedAllProductsWithImages({ page });

  // if (!ok) {
  //   redirect("/auth/login");
  // }

  return (
    <div className="h-full ml-14 mt-5 mb-10 md:ml-64">
      <Title title="mantenimiento de productos" />
      <div className="flex justify-start mb-5 md:justify-start lg:justify-end ml-2">
        <Link href={"/admind/product/new"} className="btn-primary">
          Nuevo producto
        </Link>
      </div>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
              Imagen
              </th>

              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
               Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left "
              >
               Categoria
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left "
              >
                Subcategoria
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left "
              >
                Inventario
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link 
                href={`/product/${product.slug}`}
                className="hover:underline"
                >   

                  <ProductImage 
                  src={product.images[0] ?? ''} 
                  width={80} 
                  height={80} 
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded"
                  />
                </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admind/product/${product.slug}`}>
                    {product.title}
                  </Link>
                </td>

                <td className=" text-sm  font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                {/* //todu modificar categorias */}
                <td className=" text-sm  font-light text-gray-900  px-6 py-4 whitespace-nowrap">
                  {product.category.name}
                </td>
                <td className="text-sm  font-light text-gray-900  px-6 py-4 whitespace-nowrap">
                  {product.subcategory.name}
                </td>
                <td className=" text-sm  font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>


              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  );
}
