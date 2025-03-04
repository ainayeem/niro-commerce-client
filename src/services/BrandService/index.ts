/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getValidToken } from "@/lib/verifyAccessToken";
import { revalidateTag } from "next/cache";

//  get all brands
export const getAllBrands = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      next: {
        tags: ["Brands"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return Error((error as Error).message);
  }
};

// create brand
export const createBrand = async (brandData: FormData): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      method: "POST",
      body: brandData,
      headers: {
        Authorization: token,
      },
    });
    revalidateTag("Brands");
    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

// delete brand
export const deleteBrand = async (brandId: string): Promise<any> => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand/${brandId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    revalidateTag("Brands");
    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};
