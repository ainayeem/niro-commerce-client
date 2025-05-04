/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DatePicker } from "@/components/form/DatePicker";
import { Form } from "@/components/form/Form";
import { SelectDropdown } from "@/components/form/SelectDropdown";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { discountTypeOptions } from "@/constants";
import { createCoupon } from "@/services/coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import createCouponSchema from "./CreateCouponSchema";

const CreateCouponModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createCouponSchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const discountType = form.watch("discountType");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const couponData = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };

      const res = await createCoupon(couponData);
      if (res.success) {
        toast.success(res.message);
        reset();
        setIsOpen(false);
      } else {
        toast.error(res.errorSources[0].message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create coupon");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Create Coupon</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-md rounded-lg border-2 border-primary/50">
        <DialogHeader className="w-full mx-auto flex justify-center text-center text-primary">
          <DialogTitle className="text-xl text-center">Create Coupon</DialogTitle>
          <DialogDescription className="text-sm text-center">Create a new coupon for your customers to save money.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} isValid={isValid} recaptchaStatus={true}>
            <TextInput name="code" label="Coupon Code" placeholder="Enter coupon code" />

            <SelectDropdown name="discountType" label="Discount Type" options={discountTypeOptions} placeholder="Select discount type" />

            <TextInput
              name="discountValue"
              label={`Discount Value (${discountType?.toLowerCase() === "flat" ? "$" : "%"})`}
              placeholder="Enter discount value"
              type="number"
            />

            <TextInput name="minOrderAmount" label="Minimum Order Amount" placeholder="Enter minimum order amount" type="number" />

            <TextInput name="maxDiscountAmount" label="Maximum Discount Amount" placeholder="Enter maximum discount amount" type="number" />

            <DatePicker name="startDate" label="Start Date" placeholder="Pick a start date" icon={CalendarIcon} />

            <DatePicker name="endDate" label="End Date" placeholder="Pick an end date" icon={CalendarIcon} disabled={!form.watch("startDate")} />
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCouponModal;
