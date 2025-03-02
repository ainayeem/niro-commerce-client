/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyAccessToken";
import { revalidateTag } from "next/cache";

// create category
export const createCategory = async (data: FormData) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    revalidateTag("CATEGORY");

    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

//get all categories
export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category?limit=12`, {
      next: {
        tags: ["CATEGORY"],
      },
    });

    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

// delete category
export const deleteCategory = async (categoryId: string): Promise<any> => {
  try {
    const token = await getValidToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};
