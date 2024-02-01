"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/util";

export const ProductsInCart = () => {
  const productInCart = useCartStore((state) => state.cart);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* item */}
      {productInCart.map((product) => (
        <div className="flex" key={`${product.slug}-${product.size}`}>
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5 rounded"
            style={{
              width: "100px",
              height: "100px",
            }}
          />

          <div>
            <span>
              <p>
                {`${product.title}-${product.size}`} ({product.quantity})
              </p>
            </span>
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
