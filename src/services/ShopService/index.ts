"use server";

import { getValidToken } from "@/lib/verifyAccessToken";

export const createShop = async (data: FormData) => {
  try {
    const token = await getValidToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

export const getMyShop = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop/my-shop`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["SHOP"],
      },
    });
    return res.json();
  } catch (error) {
    return (error as Error).message;
  }
};
