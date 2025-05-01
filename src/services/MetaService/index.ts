/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyAccessToken";

export const getMeta = async (startDate?: string, endDate?: string) => {
  const token = await getValidToken();
  const params = new URLSearchParams();

  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meta?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["META"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
