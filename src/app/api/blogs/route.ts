import prisma from "@/lib/db";
import { Category, Prisma } from "@prisma/client";
import { User, type Blog as BlogSchema } from "@prisma/client";

// TODO: Implement error handling

export interface BlogType extends BlogSchema {
  author: User;
}

export interface FetchBlogsResponse {
  blogs: BlogType[];
  totalCount: number;
}

export async function GET(req: Request) {
  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("query");
  const pageNumber = searchParams.get("page");
  const currentPage = isNaN(+(pageNumber || 1)) ? 1 : +(pageNumber || 1);

  const blogSelectables = {
    id: true,
    title: true,
    author: true,
    createdAt: true,
    content: true,
    updatedAt: true,
    published: true,
    category: true,
    description: true,
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

  const query = {
    where:
      category || searchQuery
        ? {
            AND: [
              category
                ? {
                    category:
                      Category[
                        category
                          .replace(" ", "_")
                          .toUpperCase() as keyof typeof Category
                      ],
                  }
                : {},
              searchQuery
                ? {
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
                  }
                : {},
            ],
          }
        : undefined,
    select: blogSelectables,
    take: 10,
    skip: 10 * (currentPage - 1),
  } satisfies Prisma.BlogFindManyArgs;

  const [blogs, totalCount] = await prisma.$transaction([
    prisma.blog.findMany(query),
    prisma.blog.count({ where: query.where }),
  ]);

  return new Response(
    JSON.stringify({ blogs, totalCount } as FetchBlogsResponse)
  );
}

export const getBlogs = async (
  search: string,
  category: string,
  page: number = 1
): Promise<FetchBlogsResponse> => {
  const response = await fetch(
    `/api/blogs?query=${search}&category=${category}&page=${page}`
  );
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json() as Promise<FetchBlogsResponse>;
};
