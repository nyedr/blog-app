"use client";

import { useQuery } from "@tanstack/react-query";

const fetchBlogs = async (blogKey: string) => {
  const res = await fetch(`/api/blogs/${blogKey}`);
  return await res.json();
};

export const useBlog = (blogKey: string) => {
  return useQuery({
    queryKey: ["blog", blogKey],
    queryFn: () => fetchBlogs(blogKey),
  });
};
