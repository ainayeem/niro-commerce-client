"use client";

import Logo from "@/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { setIsLoading } = useUser();

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);

      setIsLoading(true);

      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Demo Login functionality
  const handleDemoLogin = (userType: "user" | "shopOwner" | "admin") => {
    let demoCredentials = {
      email: "",
      password: "",
    };

    // Set demo credentials based on user type
    if (userType === "user") {
      demoCredentials = { email: "rakib@example.com", password: "123456" };
    } else if (userType === "shopOwner") {
      demoCredentials = { email: "user@test.com", password: "123456789" };
    } else if (userType === "admin") {
      demoCredentials = {
        email: "mrshakilhossain@outlook.com",
        password: "admin123",
      };
    }

    // Set the form values to the demo credentials and submit
    form.setValue("email", demoCredentials.email);
    form.setValue("password", demoCredentials.password);

    // Trigger form submission
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex mt-3 w-full flex-col">
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!} onChange={handleReCaptcha} className="mx-auto" />

            <div className="mt-4 flex flex-col gap-2">
              {/* <Button size="sm" onClick={() => handleDemoLogin("user")}>
                Demo User Login
              </Button> */}
              <Button size="sm" variant="destructive" onClick={() => handleDemoLogin("shopOwner")}>
                Demo user Login
              </Button>
              {/* <Button size="sm" variant="secondary" onClick={() => handleDemoLogin("admin")}>
                Demo Admin Login
              </Button> */}
            </div>
          </div>

          <Button disabled={reCaptchaStatus ? false : true} type="submit" className="mt-5 w-full">
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}
