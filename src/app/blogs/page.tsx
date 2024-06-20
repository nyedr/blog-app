"use client";

import Blog from "@/components/blog";
import Container from "@/components/ui/container";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getBlogs } from "../api/blogs/route";

const BlogsFilterControl = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const filterUrl = `/blogs?${search ? `query=${search}` : ""}${
    category && category !== "none"
      ? `${search ? "&" : ""}category=${category}`
      : ""
  }`;

  return (
    <div className="w-full mb-5 flex items-center gap-3">
      <Input
        className="p-3 text-lg shadow-sm"
        containerClass="flex-grow"
        placeholder="Search blogs"
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        defaultValue={category || "none"}
        onValueChange={(e) => setCategory(e)}
      >
        <SelectTrigger className="w-[180px] p-3 text-lg shadow-sm">
          <SelectValue placeholder="Blog category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="emerging tech">Emerging tech</SelectItem>
            <SelectItem value="consumer tech">Consumer tech</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Link className={buttonVariants()} href={filterUrl}>
        Search
      </Link>
    </div>
  );
};

interface BlogsPaginationProps {
  currentPage: number;
  totalCount: number;
  searchParam?: string;
  categoryParam?: string;
}

const BlogsPagination = ({
  currentPage,
  totalCount,
  categoryParam,
  searchParam,
}: BlogsPaginationProps) => {
  const totalPages = Math.ceil(totalCount / 10);
  const getPaginationLink = (page: number) => {
    return `/blogs?page=${page}${searchParam ? `&query=${searchParam}` : ""}${
      categoryParam ? `&category=${categoryParam}` : ""
    }`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage !== 1 ? getPaginationLink(currentPage - 1) : "#"}
          />
        </PaginationItem>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationLink href={getPaginationLink(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={getPaginationLink(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage + 1 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage !== totalPages
                ? getPaginationLink(currentPage + 1)
                : "#"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const BlogsPage = () => {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const searchParam = searchParams.get("query") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const pageNumber = searchParams.get("page");
  const currentPage = isNaN(+(pageNumber || 1)) ? 1 : +(pageNumber || 1);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["blogs", searchParam, categoryParam],
    queryFn: () => getBlogs(searchParam, categoryParam, currentPage),
  });

  if (isLoading) return <Loading size={50} />;
  if (isError || data?.blogs == null) {
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

  const { blogs, totalCount } = data;

  return (
    <Container className="flex py-10 itesm-center flex-col gap-10">
      <h1 className="text-5xl font-semibold">Blogs Page</h1>
      <div>
        <BlogsFilterControl />
        <div className="w-full gap-4 flex flex-col">
          {blogs?.map(
            (blog) => blog.published && <Blog {...blog} key={blog.id} />
          )}
        </div>
      </div>
      <BlogsPagination
        currentPage={currentPage}
        totalCount={totalCount}
        categoryParam={categoryParam}
        searchParam={searchParam}
      />
    </Container>
  );
};

export default BlogsPage;
