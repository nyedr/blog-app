"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserLoginData, userLoginSchema } from "@/lib/zod/login";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<UserLoginData>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleUserLogin: SubmitHandler<UserLoginData> = async (
    data: UserLoginData
  ) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 15000);

    console.log("Submitting sign in details", data);

    const callbackUrl = decodeURIComponent(
      searchParams.get("callbackUrl") ?? "/"
    );

    const response = await signIn("credentials", {
      ...data,
      callbackUrl,
    });

    if (response && !response?.ok) {
      toast({
        title: response?.error ?? "Something went wrong",
        description: JSON.stringify({ response, data }, null, 2),
      });
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full gap-4"
        data-testid="signin-form"
        onSubmit={(...args) => void form.handleSubmit(handleUserLogin)(...args)}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="placeholder@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" isPrivateable={true} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} isLoading={isLoading} type="submit">
          Continue
          <span className="sr-only">Log in</span>
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
