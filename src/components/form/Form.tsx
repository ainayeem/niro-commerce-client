import { Button } from "@/components/ui/button";
import { FieldValues, FormProvider } from "react-hook-form";
import { FormProps } from "./types";

export function Form<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  isSubmitting,
  isValid,
  recaptchaStatus,
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
        <Button type="submit" className="w-full" disabled={!isValid || isSubmitting || !recaptchaStatus}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
