import prisma from "@/lib/db";
import { Prisma, User } from "@prisma/client";
import { BlogType, blogSelectables } from "../../blogs/route";
import { ProfileData } from "@/lib/zod/profile";

export interface UserAccount extends Omit<User, "hashedPwd"> {
  comments: {
    id: string;
    text: string;
    createdAt: Date;
    blogId: string;
  }[];
  blogs: BlogType[];
}

export const getUserAccount = async (name: string) => {
  const getUserResponse = await fetch(`/api/user/${name}`);
  if (!getUserResponse.ok) throw new Error("User not found");
  return (await getUserResponse.json()) as User;
};

export const GET = async (
  req: Request,
  params: { params: { name: string } }
) => {
  const userName = decodeURIComponent(params.params.name);

  const user = await prisma.user.findUnique({
    where: {
      name: userName,
    },
    include: {
      blogs: {
        select: blogSelectables,
      },
      comments: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          blogId: true,
        },
      },
    },
  } satisfies Prisma.UserFindUniqueArgs);

  if (user == null) {
    return new Response("Author not found", { status: 404 });
  }

  return new Response(
    JSON.stringify({ ...user, hashedPwd: undefined } as UserAccount),
    {
      status: 200,
    }
  );
};

export const setUserAccountPatch = async (name: string, data: ProfileData) => {
  const setUserResponse = await fetch(`/api/user/${name}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!setUserResponse.ok) throw new Error("Failed to update account");
  return (await setUserResponse.json()) as User;
};

export const PATCH = async (
  req: Request,
  params: { params: { name: string }; body: ProfileData }
) => {
  console.log(req);
  const userName = decodeURIComponent(params.params.name);
  const userData = (await req.json()) as ProfileData;

  const updatedUser = await prisma.user.update({
    where: {
      name: userName,
    },
    data: userData,
  });

  return new Response(JSON.stringify(updatedUser), { status: 200 });
};
