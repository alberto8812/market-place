"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAddressStores, useCartStore } from "@/store";
import { currencyFormat } from "@/util";
import { placeOrder } from "@/actions";

export const PlaceOrdrer = () => {
  const router=useRouter()
  const [Loaded, setLoaded] = useState(false);
  const [isPlaceOrdenr, setIsPlaceOrder] = useState(false);
  const [errorMessage, setErroMessage] = useState('');
  const address = useAddressStores((state) => state.address);
  const clearCart=useCartStore(state=>state.clearCart);

  const { itemsInCart, subtotal, tax, total } = useCartStore((state) =>
    state.getSumaryInformation()
  );
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrden = async () => {
    setIsPlaceOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
      sizeId:product.sizeId,
      idInventory:product.idInventory
    }));

    const resp= await placeOrder(productsToOrder,address);
    if(!resp.ok){
      setIsPlaceOrder(false)
      setErroMessage(resp.message);
      return;
    }

    clearCart();
    router.replace('/orders/' + resp.order!.id);


  };

  if (!Loaded) {
    return <p>Cargando ...</p>;
  }
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-2">{address.address}</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.optionalAddres}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Producto</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} articulos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>

        <span>Impuesto (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-2 text-2xl">Total</span>
        <span className="mt-5  text-right text-2xl">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* disclamer */}
          <span className="text-xs">
            acepta nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              politica de privacida
            </a>
          </span>
        </p>
        <p className="text-red-500">{errorMessage}</p>
        <button
          className={clsx({
            "btn-primary": !isPlaceOrdenr,
            "btn-disabled": isPlaceOrdenr,
          })}
          onClick={onPlaceOrden}
          // href="/orders/123"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
