"use client";

import Blog from "@/components/blog";
import Container from "@/components/ui/container";
import { User, type Blog as BlogSchema } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export interface BlogType extends BlogSchema {
  author: User;
}

const getBlogs = async (
  search: string,
  category: string
): Promise<BlogType[]> => {
  const response = await fetch(
    `/api/blogs?query=${search}&category=${category}`
  );
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json() as Promise<BlogType[]>;
};

const BlogsPage = () => {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("query") ?? "";
  const categoryParam = searchParams.get("category") ?? "";

  const {
    data: blogs,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["blogs", searchParam, categoryParam],
    queryFn: () => getBlogs(searchParam, categoryParam),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !blogs) return <p>Error: {error?.message}</p>;

  return (
    <Container>
      <h1 className="text-5xl font-semibold mb-10">Blogs Page</h1>
      {/* TODO: Implement blog search filters */}
      <div className="w-full gap-4 flex flex-col">
        {blogs.map(
          (blog) => blog.published && <Blog {...blog} key={blog.id} />
        )}
      </div>
    </Container>
  );
};

export default BlogsPage;
