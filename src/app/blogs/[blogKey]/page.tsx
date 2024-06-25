"use client";

import { BlogType } from "@/app/api/blogs/route";
import Loading from "@/app/loading";
import BlogContent from "@/components/blog-content";
import { CommentSection } from "@/components/comment-section";
import Avatar from "@/components/ui/avatar";
import Container from "@/components/ui/container";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useBlog } from "@/hooks/useBlog";
import { formatDateTime, slugify } from "@/lib/utils";
import { UseQueryResult } from "@tanstack/react-query";
import Link from "next/link";

const BlogPage = ({ params: { blogKey } }: { params: { blogKey: string } }) => {
  const { toast } = useToast();
  const {
    data: blog,
    isLoading,
    error,
  }: UseQueryResult<BlogType, Error> = useBlog(blogKey);

  if (isLoading) return <Loading size={50} />;
  if (blog == null) {
    toast({
      title: "Failed to fetch blogs",
      description:
        error instanceof Error
          ? error.message
          : "An error occurred, please try again.",
      action: <ToastAction altText="Refetch blogs">Retry</ToastAction>,
    });

    return <Loading size={50} />;
  }

  // TODO: Fix code formatting inside md code blocks
  // HTML is being escaped in the content

  return (
    <Container className="flex py-10 items-center flex-col gap-3">
      <h1 className="text-3xl lg:text-5xl font-semibold mb-4 lg:mb-7">
        {blog.title}
      </h1>
      <div className="w-full bg-secondary rounded-lg py-4 flex items-center justify-between px-4">
        <Link
          className="flex gap-4 items-center font-medium transition-colors underline-offset-4 hover:underline"
          href={`/author/${encodeURIComponent(blog.author.name)}`}
        >
          <Avatar imageUrl={blog.author.image} name={blog.author.name} />{" "}
          {blog.author.name}
        </Link>
        <span className="opacity-70">{formatDateTime(blog.createdAt)}</span>
      </div>
      <BlogContent content={blog.content} />
      <CommentSection blogId={blog.id} comments={blog.comments} />
    </Container>
  );
};

export default BlogPage;
