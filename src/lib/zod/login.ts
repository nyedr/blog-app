import { Provider, User } from "@prisma/client";
import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(30, { message: "Pass must be less than 30 characters" }),
});

export type UserLoginData = z.infer<typeof userLoginSchema>;

export type LoginResponse = {
  isError: boolean;
  user: Omit<User, "hashedPwd"> | null;
  error?: {
    title: string;
    description: string;
  };
  provider?: Provider;
};
