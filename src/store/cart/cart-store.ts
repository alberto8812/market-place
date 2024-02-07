import { create } from "zustand";
import { CartProduct } from "@/components/interfaces";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  sizeId:string

  getTotalItems: () => number;
  getSumaryInformation: () => {
    subtotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
   
  };
  
  addProductToCard: (product: CartProduct) => void;
  
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  
  clearCart: () => void;
  upDateSizeId:(sizeId:string)=>void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      sizeId:'',

      addProductToCard: (product: CartProduct) => {
        const { cart } = get();

        //1.revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        //2. se que el producto existe por tallas.. incrementar cantidad
        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, queantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProduct });
      },

      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSumaryInformation: () => {
        const { cart } = get();
        const subtotal = cart.reduce(
          (subtotal, producto) => producto.quantity * producto.priceSale + subtotal,
          0
        );
        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subtotal,
          tax,
          total,
          itemsInCart,
        };
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const productfilter = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: productfilter });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updateCartProduct = cart.filter(
          (item) => product.id !== item.id || item.size !== product.size
        );
        set({ cart: updateCartProduct });
      },

      clearCart: () => {
        set({ cart: [] });
      },
      upDateSizeId:(sizeId:string)=>set({sizeId:sizeId})
    }),

    { name: "shopping-cart" }
  )
);
