/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyAccessToken";
import { revalidateTag } from "next/cache";

export const addCoupon = async (couponCode: string, subTotal: number, shopId: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderAmount: subTotal, shopId }),
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getCoupons = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["COUPON"],
      },
    });

    return await res.json();
  } catch (error: any) {
    return new Error(error);
  }
};

export const createCoupon = async (data: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      next: {
        tags: ["COUPON"],
      },
    });

    const result = await res.json();
    revalidateTag("COUPON");
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};
