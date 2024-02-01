import { Title } from "@/components";

import Image from "next/image";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrdrer } from "./ui/PlaceOrdrer";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verificar orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5 hover:text-blue-700">
              Editar Carrito
            </Link>

            {/* items */}

            <ProductsInCart />
          </div>

          {/* chekout */}
          <PlaceOrdrer />
        </div>
      </div>
    </div>
  );
}
