'use server'
import prisma from "@/lib/prisma";

export const getAllUserCount = async () => {
  try {
    const clientCount = await prisma.user.groupBy({
      by: ["roles"],
      _count: {
        roles: true,
      },
      where: {
        roles: "user",
      },
    });
    const totalClient = { ...clientCount[0] } || { _count: { roles: 0 } };
    return {
      totalClient,
    };
  } catch (error) {
    console.log(true);
    return {
      ok: true,
      message: "eror al contar",
    };
  }
};
