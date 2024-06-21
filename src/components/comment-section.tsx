"use client";

import { UserComment } from "@/app/api/blogs/route";
import Avatar from "./ui/avatar";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "@/app/api/comment/route";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "./ui/button";

export const CommentComponent = ({
  author,
  createdAt,
  id,
  text,
}: UserComment) => {
  return (
    <div className="w-full bg-secondary flex flex-col items-start gap-3 p-4 rounded-md">
      <div className="flex w-full justify-between items-center gap-3 font-medium">
        <Link
          className="flex gap-4 items-center font-medium"
          href={`/profile/${author.id}`}
        >
          <Avatar imageUrl={author.image} name={author.name} /> {author.name}
        </Link>
        <span className="opacity-70">{formatDate(createdAt)}</span>
      </div>
      <p className="opacity-85 py-2">{text}</p>
    </div>
  );
};

interface CommentSectionProps {
  comments: UserComment[];
  blogId: string;
}

export const CommentSection = ({ comments, blogId }: CommentSectionProps) => {
  const { status, data } = useSession();
  const [commentText, setCommentText] = useState("");

  const mutation = useMutation({
    mutationKey: ["comment", blogId],
    // @ts-ignore
    mutationFn: (text: string) => createComment(blogId, data?.user?.id, text),
  });

  return (
    <div className="max-w-[85ch] flex flex-col items-start gap-5">
      <h2 className="text-4xl font-semibold">Comments</h2>
      <div className="w-full flex flex-col gap-4">
        {comments.map((comment) => (
          <CommentComponent key={comment.id} {...comment} />
        ))}
      </div>
      {status === "authenticated" ? (
        <div className="w-full bg-secondary rounded-lg py-4 px-4">
          <Textarea
            className="w-full bg-transparent resize-none focus:outline-none"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            isLoading={mutation.isPending}
            onClick={() => {
              mutation.mutate(commentText);
              setCommentText("");
            }}
            className="bg-primary text-white rounded-md py-2 px-4 mt-4"
          >
            Comment
          </Button>
        </div>
      ) : (
        <div className="w-full bg-secondary rounded-lg py-4 px-4">
          <p className="text-center">Please sign in to comment</p>
        </div>
      )}
    </div>
  );
};
