import Image from "next/image";
import placeholderImage from "../../public/BlogPlaceholderImageV1.png";
import Link from "next/link";
import { formatDate, slugify } from "@/lib/utils";

interface BlogProps {
  image?: string;
  title: string;
  author: string;
  date: string;
}

const Blog = ({ author, date, title, image }: BlogProps) => {
  return (
    <Link href={`/blogs/${slugify(title)}`} className="flex items-center gap-3">
      <Image
        width={152}
        height={90}
        src={image ?? placeholderImage}
        alt={title}
      />
      <div className="flex p-2 flex-col border-b space-between gap-3 items-start">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-between w-full gap-3">
          <p className="text-sm">{author}</p>
          <p className="text-sm">{formatDate(date)}</p>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
