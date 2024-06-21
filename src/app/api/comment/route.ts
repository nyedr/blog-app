import prisma from "@/lib/db";

export const createComment = async (
  blogId: string,
  userId: string,
  text: string
) => {
  console.log("userId", userId, "blogId", blogId, "text", text);
  const response = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({ blogId, userId, text }),
  });

  return await response.json();
};

export const POST = async (req: Request) => {
  const { blogId, userId, text } = await req.json();

  console.log("userId", userId);

  const comment = await prisma.comment.create({
    data: {
      blogId,
      authorId: userId,
      text,
    },
  });

  return new Response(JSON.stringify(comment), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
