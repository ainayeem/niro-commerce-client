import { z } from "zod";

export const createShopSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  businessLicenseNumber: z.string().min(1, "Business license number is required"),
  address: z.string().min(1, "Address is required"),
  contactNumber: z.string().min(11, "Contact number must be at least 11 digits").max(11, "Contact number cannot exceed 11 digits"),
  website: z
    .string()
    .trim()
    .refine((val) => val === "" || /^https?:\/\/.+\..+/.test(val), {
      message: "Invalid website URL",
    }),
  establishedYear: z.string().regex(/^\d{4}$/, "Invalid year format"),
  taxIdentificationNumber: z.string().min(1, "Tax ID is required"),
  socialMediaLinks: z.object({
    facebook: z
      .string()
      .trim()
      .refine((val) => val === "" || /^https?:\/\/.+\..+/.test(val), {
        message: "Invalid Facebook URL",
      }),
    twitter: z
      .string()
      .trim()
      .refine((val) => val === "" || /^https?:\/\/.+\..+/.test(val), {
        message: "Invalid Twitter URL",
      }),
    instagram: z
      .string()
      .trim()
      .refine((val) => val === "" || /^https?:\/\/.+\..+/.test(val), {
        message: "Invalid Instagram URL",
      }),
  }),
  servicesOffered: z.string().min(1, "At least one service is required"),
});
