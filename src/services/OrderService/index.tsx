/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyAccessToken";
import { revalidateTag } from "next/cache";

export const getMyOrders = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/my-orders`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["ORDER"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyShopOrders = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/my-shop-orders`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["ORDER"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getOrderById = async (orderId: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["ORDER"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const changeOrderStatus = async (orderId: string, status: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    revalidateTag("ORDER");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
