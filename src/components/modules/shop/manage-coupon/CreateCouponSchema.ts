import { z } from "zod";

const createCouponSchema = z.object({
  code: z.string().min(3, "Coupon code is required."),
  discountType: z.enum(["Flat", "Percentage"]),
  discountValue: z.preprocess((val) => Number(val), z.number().min(0, "Discount value is required.")),
  minOrderAmount: z.preprocess((val) => Number(val), z.number().min(0, "Minimum order amount is required.")),
  maxDiscountAmount: z.preprocess((val) => Number(val), z.number().min(0, "Maximum discount amount is required.")),
  startDate: z.date().min(new Date(), "Start date is required."),
  endDate: z.date().min(new Date(), "End date is required."),
});

export default createCouponSchema;
