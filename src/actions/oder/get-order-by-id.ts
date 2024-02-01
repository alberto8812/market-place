"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getOrderById = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return {
        ok: false,
        message: "usurio debe estar autenticado",
      };
    }
    const order = await prisma.order.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        subTotal: true,
        total: true,
        tax: true,
        itemsInorder: true,
        isPaid: true,
        userId: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            prodcut: {
              select: {
                title: true,
                slug: true,
                productImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        OrderAddress: true,
      },
    });

    if (!order) throw `${id} no existe`;

    if (session.user.roles === "user") {
      if (session.user.id !== order.userId) {
        throw `${id} no es de ese usuario`;
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
