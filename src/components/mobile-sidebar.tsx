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
import { navItemTriggerStyle } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

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
          <Accordion className="px-4" collapsible type="single">
            <AccordionItem value="category">
              <AccordionTrigger className="text-bold w-full">
                Blogs
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col items-start w-full gap-2">
                  {blogCategories.map((category) => (
                    <li className="w-full justify-start" key={category.title}>
                      <Link
                        className={cn(
                          navItemTriggerStyle(),
                          "w-full justify-start"
                        )}
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
            className={cn(
              navItemTriggerStyle(),
              "text-base w-full justify-start"
            )}
            href={"/about"}
          >
            About
          </Link>
        </li>
        <li className="w-full">
          <Link
            className={cn(
              navItemTriggerStyle(),
              "text-base w-full justify-start"
            )}
            href={"/newsletter"}
          >
            Newsletter
          </Link>
        </li>
      </ul>
    </NavSheet>
  );
};
