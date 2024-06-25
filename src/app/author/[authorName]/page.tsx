"use client";

import { UserAccount, getUserAccount } from "@/app/api/user/[name]/route";
import Loading from "@/app/loading";
import Blog from "@/components/blog";
import { CommentComponent } from "@/components/comment-section";
import Container from "@/components/ui/container";
import { userConfig } from "@/lib/config";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ProfilePage = ({
  params: { authorName },
}: {
  params: { authorName: string };
}) => {
  const {
    data: author,
    error,
    isLoading,
  }: UseQueryResult<UserAccount, Error> = useQuery({
    queryKey: ["author", authorName],
    queryFn: () => getUserAccount(authorName),
  });

  if (isLoading) return <Loading size={50} />;
  if (error || !author) return <div>Error: {error?.message}</div>;

  return (
    <div className="flex py-0 justify-center items-center flex-col gap-10 pb-10">
      <div className="bg-secondary w-screen flex justify-center items-center py-9">
        <Container className="sm:px-0 flex sm:flex-row flex-col items-center gap-12 bg-secondary">
          <Image
            src={author.image ?? userConfig.defaultUserImage}
            alt={author.name}
            width={250}
            height={250}
            className="rounded-full w-64 h-64"
          />
          <div className="flex flex-col items-start gap-5">
            <h1 className="text-6xl font-semibold">{author?.name}</h1>
            <p className="text-sm opacity-80 max-w-[85ch]">{author?.bio}</p>
          </div>
        </Container>
      </div>
      <Container>
        <h1 className="text-5xl font-semibold mb-10">Blogs</h1>
        <div className="w-full gap-4 flex flex-col">
          {(author.blogs as UserAccount["blogs"])?.map(
            (blog) => blog.published && <Blog {...blog} key={blog.id} />
          )}
        </div>
      </Container>
      <Container>
        <h1 className="text-5xl font-semibold mb-10">Comments</h1>
        <div className="w-full flex flex-col gap-4">
          {author.comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              {...{ ...comment, author: author }}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
