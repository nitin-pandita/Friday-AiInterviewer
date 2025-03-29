"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account Created Successfully! Please Sign In");
        router.push("/sign-in");
        console.log("Sign Up", values);
      } else {
        toast.success("Sign In Successful");
        router.push("/");
        console.log("Sign In", values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong: ${error}`);
    }
  }

  const isSign = type === "sign-in";

  return (
    <div className="card-border lg:min-[556px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Friday Ai Interviewer</h2>
        </div>
        <h3>Practice Job Interview and crack your dream company</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSign && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your Email"
            />{" "}
            <FormField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your Password"
            />
            <Button className="btn" type="submit">
              {isSign ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSign ? "No Account Yet?" : "Have an account already?"}
          <Link
            className="font-bold text-user-primary ml-1"
            href={!isSign ? "/sign-in" : "/sign-up"}
          >
            {isSign ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
