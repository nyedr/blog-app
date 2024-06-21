import Markdown from "react-markdown";
import style from "@/styles/markdown-styles.module.css";
import { cn, rawToString } from "@/lib/utils";

const BlogContent = ({ content }: { content: string }) => {
  return (
    <Markdown
      skipHtml={true}
      unwrapDisallowed={true}
      className={cn("max-w-[85ch] w-full", style.reactMarkDown)}
    >
      {rawToString(content)}
    </Markdown>
  );
};

export default BlogContent;
