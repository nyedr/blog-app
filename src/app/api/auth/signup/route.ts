import { UserSignUpData, userSignUpSchema } from "@/lib/zod/signup";

import prisma from "@/lib/db";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { email, name, password } = (await req.json()) as UserSignUpData;

  try {
    const {
      email: validatedEmail,
      password: validatedPwd,
      name: validatedname,
    } = userSignUpSchema.parse({
      email,
      name,
      password,
    });

    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedEmail,
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          isError: true,
          user: null,
          error: {
            title: "User already exists",
            description: "A user with that email address already exists.",
          },
        }),
        { status: 409 }
      );
    }

    // create user
    const user = await prisma.user.create({
      data: {
        name: validatedname,
        email: validatedEmail,
        hashedPwd: await hash(validatedPwd, 10),
      },
    });

    return new Response(
      JSON.stringify({
        isError: false,
        user: { ...user, hashPassword: undefined },
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          isError: true,
          user: null,
          error: {
            title: "Bad request",
            description: error.message,
          },
        }),
        { status: 400 }
      );
    } else {
      return new Response(
        JSON.stringify({
          title: "Bad request",
          description: "An unknown error occurred.",
        }),
        { status: 400 }
      );
    }
  }
}
