"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { blogCategories, siteConfig } from "@/lib/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NavSheet = ({ children }: { children: React.ReactNode }) => (
  <Sheet key={"left"}>
    <SheetTrigger asChild>
      <Button variant="outline" className="w-10 h-10 p-2">
        <Icons.menu className="w-5 h-5" />
        <span className="sr-only">Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side={"left"}>
      <SheetHeader className="mb-5">
        {/* TODO: Add logo */}
        <SheetTitle className="w-full text-left">{siteConfig.name}</SheetTitle>
      </SheetHeader>
      {children}
    </SheetContent>
  </Sheet>
);

export const MobileSidebar = () => {
  return (
    <NavSheet>
      <ul className="flex flex-col items-start w-full gap-2">
        <li className="w-full">
          <Accordion defaultValue="category" type="single">
            <AccordionItem value="category">
              <AccordionTrigger className="text-bold w-full">
                Blogs
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col items-start w-full gap-2">
                  {blogCategories.map((category) => (
                    <li key={category.title}>
                      <Link
                        className={buttonVariants({ variant: "link" })}
                        href={`/blogs?category=${encodeURIComponent(
                          category.title.toLowerCase()
                        )}`}
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  className={buttonVariants({
                    className: "text-base mt-4 font-normal",
                    size: "sm",
                  })}
                  href="/blogs"
                >
                  See all blogs
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </li>

        <li className="w-full">
          <Link
            className={buttonVariants({
              variant: "link",
              className: "px-0 text-base",
            })}
            href={"/about"}
          >
            About
          </Link>
        </li>
        <li className="w-full">
          <Link
            className={buttonVariants({
              variant: "link",
              className: "px-0 text-base",
            })}
            href={"/newsletter"}
          >
            Newsletter
          </Link>
        </li>
      </ul>
    </NavSheet>
  );
};
