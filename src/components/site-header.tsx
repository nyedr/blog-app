"use client";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/config";
import Avatar from "./ui/avatar";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

function SiteHeader() {
  const { status } = useSession();

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b hidden min-[800px]:block">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <ThemeToggle />
          {status === "authenticated" ? (
            <Avatar />
          ) : (
            <Link
              href="/auth/signin"
              className={cn(
                buttonVariants({
                  size: "sm",
                  className: "no-underline",
                })
              )}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
