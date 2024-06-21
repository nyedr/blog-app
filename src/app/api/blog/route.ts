import prisma from "@/lib/db";
import { slugify } from "@/lib/utils";

export const POST = async (req: Request) => {
  const { title, content, category, description, authorId } = await req.json();

  const blogKey = slugify(title);

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      category,
      description,
      blogKey,
      authorId,
    },
  });

  return new Response(JSON.stringify(blog));
};
