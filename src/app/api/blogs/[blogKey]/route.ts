import prisma from "@/lib/db";
import { blogSelectables } from "../route";

export const GET = async (
  req: Request,
  params: { params: { blogKey: string } }
) => {
  const blogKey = params.params.blogKey;

  const blog = await prisma.blog.findUnique({
    where: {
      blogKey,
    },
    select: blogSelectables,
  });

  return new Response(JSON.stringify(blog));
};
