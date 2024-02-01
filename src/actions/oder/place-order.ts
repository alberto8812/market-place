"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Address, Sizes } from "@/components/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Sizes | undefined;
  sizeId: string | undefined;
  idInventory: string | undefined;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  addrress: Address
) => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return {
        ok: false,
        message: "no hay sesion de usuario",
      };
    }

    const idsProducts = productIds.map((product) => product.productId);
    const idsSizes = productIds.map((product) => product.idInventory);

    //consultar products
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: idsProducts,
        },
      },
    });
    //consultar products con inventario
    const inventoryProducts = await prisma.inventory.findMany({
      select: {
        id: true,
        inStock: true,
        product: true,
      },
      where: {
        id: {
          in: idsSizes as string[], // Puedes ajustar el tipo según tus necesidades
        },
        product: {
          id: {
            in: idsProducts,
          },
        },
      },
    });

    //console.log(products)
    // console.log(inventoryProducts)

    //calcular los montos

    const itemsInorder = productIds.reduce((count, p) => count + p.quantity, 0);

    const { subTotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQueantity = item.quantity;
        const product = products.find(
          (product) => product.id === item.productId
        );

        if (!product) throw new Error(`${item.productId} no existe-500`);

        const subTotal = product.price * productQueantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
      },
      { subTotal: 0, tax: 0, total: 0 }
    );

    //crear transaccion
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. actualizar el stock de los productos

      const updateProductPromises = inventoryProducts.map(async (inventory) => {
        //acumular los valores
        //todo cambiar po inventary
        const productQuantity = productIds
          .filter((p) => p.idInventory === inventory.id)
          .reduce((acs, item) => item.quantity + acs, 0);

  

        if (productQuantity === 0)
          throw new Error(
            `el ${inventory.product.id} con codigo de iventario ${inventory.id} no tiene  cantidad definida`
          );

        //todo se debe actualizar  producto y inventary
        return tx.inventory.update({
          where: { id: inventory.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
            product: {
              update: {
                where: {
                  id: inventory.product.id,
                },
                data: {
                  inStock: {
                    decrement: productQuantity,
                  },
                  
                },
                
              },
            },
          },
        });
      });
      const updateProducts=await Promise.all(updateProductPromises);


      //verificar valores negativos no stock

      updateProducts.forEach(product=>{
        if(product.inStock<0){
          throw new Error(`${product.id} no tiene inventario suficiente`)
        }
      })

      //2. crear la orden header

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInorder: itemsInorder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size === undefined ? "NA" : p.size,
                ProductId: p.productId,
                inventoryId:p.idInventory!,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      //validar si el price es cero  , lanzar un error
      //todo si el precio es cero lanzar error

      //3. crear la direccion de la orden
      const {country,...restAddress}=addrress;

      const orderAddress= await tx.orderAddress.create({
        data:{
          firstName:restAddress.firstName,
          lastName:restAddress.lastName,
          address:restAddress.address,
          optionalAddres:restAddress.optionalAddres,
          postalCode:restAddress.postalCode,
          city:restAddress.city,
          phone:restAddress.phone,
          countryId:country,
          orderId:order.id
        }
      })
      return {
        order: order,
        updateProduct: updateProducts,
        orderAddress: orderAddress,
      };
    });


    return {
      ok: true,
      order:prismaTx.order,
      prismaTx:prismaTx,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error?.message,
    };
  }
};
