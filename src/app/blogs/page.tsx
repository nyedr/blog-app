"use client";

import { useQuery } from "@tanstack/react-query";

const BlogsPage = () => {
  const {} = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {},
    staleTime: 60000,
  });

  return (
    <div>
      <h1>Blog Page</h1>
    </div>
  );
};

export default BlogsPage;
