import prisma from "@/lib/db";
import { Category } from "@prisma/client";

export async function GET(req: Request) {
  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("query");

  let blogs = [];

  const blogSelectables = {
    id: true,
    title: true,
    author: true,
    createdAt: true,
    content: true,
    updatedAt: true,
    published: true,
    category: true,
    authorId: true,
    comments: {
      select: {
        id: true,
        author: true,
        createdAt: true,
        text: true,
      },
    },
  };

  if (searchQuery && !category) {
    blogs = await prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
      select: blogSelectables,
    });

    return new Response(JSON.stringify(blogs));
  }

  if (category && !searchQuery) {
    if (!Category[category.toUpperCase() as keyof typeof Category])
      return new Response("Invalid category", { status: 400 });

    blogs = await prisma.blog.findMany({
      where: {
        category: {
          equals: Category[category.toUpperCase() as keyof typeof Category],
        },
      },
      select: blogSelectables,
    });

    return new Response(JSON.stringify(blogs));
  }

  if (category && searchQuery) {
    blogs = await prisma.blog.findMany({
      where: {
        AND: [
          {
            category: {
              equals: Category[category.toUpperCase() as keyof typeof Category],
            },
          },
          {
            OR: [
              {
                title: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
              {
                content: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      select: blogSelectables,
    });

    return new Response(JSON.stringify(blogs));
  }

  blogs = await prisma.blog.findMany({
    select: blogSelectables,
  });

  return new Response(JSON.stringify(blogs));
}
