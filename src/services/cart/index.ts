"use server";

import { getValidToken } from "@/lib/verifyAccessToken";
import { IOrder } from "@/types";

export const createOrder = async (order: IOrder) => {
  try {
    const token = await getValidToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    return await res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

export const addCoupon = async (couponCode: string, subTotal: number, shopId: string) => {
  try {
    const token = await getValidToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderAmount: subTotal, shopId }),
    });

    return await res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};
