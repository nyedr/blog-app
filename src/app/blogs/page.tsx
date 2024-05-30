import prisma from "@/lib/db";
import Blog from "@/components/blog";

const BlogsPage = async () => {
  // const blogs = await prisma.blog.findMany({
  //   include: {
  //     author: true,
  //   },
  // });
  // return (
  //   <div>
  //     <h1>Blog Page</h1>
  //     <div className="flex flex-wrap w-full gap-4">
  //       {blogs.map((blog) => (
  //         <Blog
  //           {...{
  //             authorName: blog.author.name,
  //             title: blog.title,
  //             content: blog.content,
  //             id: blog.id,
  //             createdAt: blog.createdAt,
  //             key: blog.id,
  //           }}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default BlogsPage;
