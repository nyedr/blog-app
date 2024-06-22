import prisma from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const createComment = async (
  blogId: string,
  userId: string,
  text: string
) => {
  console.log("userId", userId, "blogId", blogId, "text", text);
  const response = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({ blogId, userId, text }),
  });

  return await response.json();
};

export const POST = async (req: NextRequest) => {
  const { blogId, userId, text } = await req.json();
  const token = await getToken({ req });

  if (!token?.email && !blogId)
    return new Response("Unauthorized", { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      email: token?.email ?? "",
    },
  });

  const comment = await prisma.comment.create({
    data: {
      blogId,
      authorId: user?.id ?? userId,
      text,
    },
  });

  return new Response(JSON.stringify(comment), {
    status: 201,
  });
};
