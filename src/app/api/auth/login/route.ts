import { LoginResponse, UserLoginData, userLoginSchema } from "@/lib/zod/login";
import bcryptjs from "bcryptjs";
import { z } from "zod";

import prisma from "@/lib/db";

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as UserLoginData;

  console.log("Sign in data:", { email, password });

  try {
    const { email: validatedEmail, password: validatedPwd } =
      userLoginSchema.parse({
        email,
        password,
      });

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedEmail,
      },
    });

    if (!existingUser) {
      return new Response(
        JSON.stringify({
          isError: true,
          user: null,
          error: {
            title: "User does not exist",
            description:
              "Please sign up first if you don't have an account, or press \"can't sign in\" if you need help.",
          },
        } as LoginResponse),
        {
          status: 403,
        }
      );
    }

    const passwordMatch = await bcryptjs.compare(
      validatedPwd,
      existingUser.hashedPwd
    );

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({
          isError: true,
          user: null,
          error: {
            title: "Password does not match",
            description: "The password you entered is incorrect.",
          },
        } as LoginResponse),
        { status: 403 }
      );
    }

    return new Response(
      JSON.stringify({
        isError: false,
        user: { ...existingUser, hashedPwd: undefined, salt: undefined },
        error: null,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error || error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          isError: true,
          user: null,
          error: { title: "Invalid input", description: error.message },
        } as LoginResponse),
        { status: 400 }
      );
    }
  }
}
