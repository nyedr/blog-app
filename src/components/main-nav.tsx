"use client";

import Link from "next/link";

import { Icons } from "@/components/icons";
import { blogCategories, siteConfig } from "@/lib/config";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  ListItem,
  NavigationMenuLink,
  navItemTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "./ui/button";

export const MainNav = () => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-7 w-7" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <nav className="flex gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base">
                Blogs
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {blogCategories.map((category) => (
                    <ListItem
                      key={category.title}
                      title={category.title}
                      href={`/blogs?category=${encodeURIComponent(
                        category.title.toLowerCase()
                      )}`}
                    >
                      {category.description}
                    </ListItem>
                  ))}
                </ul>
                <Link
                  href="/blogs"
                  className={buttonVariants({
                    className: "ml-6 mb-6 mt-[-4px]",
                    size: "sm",
                  })}
                >
                  See all blogs
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navItemTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/newsletter" legacyBehavior passHref>
                <NavigationMenuLink className={navItemTriggerStyle()}>
                  Newsletter
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
};
