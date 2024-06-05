import { capitalize, formatDate, slugify, truncate } from "@/lib/utils";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Avatar from "./ui/avatar";
import { BlogType } from "@/app/blogs/page";

const Blog = ({
  category,
  createdAt,
  description,
  title,
  author,
}: BlogType) => {
  return (
    <div className="p-5 px-6 rounded-md bg-secondary flex gap-3 flex-col">
      <div className="flex gap-3 items-center">
        <Badge className="rounded-md">{capitalize(category)}</Badge>
        <span>{formatDate(createdAt)}</span>
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && (
        <p className="text-lg sm:max-w-[65%]">{truncate(description, 150)}</p>
      )}
      <div className="w-full flex items-center gap-5">
        <Link
          className="text-lg font-semibold transition-colors underline-offset-4 hover:underline text-blue-400 hover:text-blue-400/80"
          href={`/blogs/${slugify(title)}`}
        >
          Read more
        </Link>
        <Link
          className="flex gap-4 items-center"
          href={`/profile/${author.id}`}
        >
          <Avatar imageUrl={author.image} name={author.name} /> by {author.name}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
