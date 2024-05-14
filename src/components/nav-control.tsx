"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "./ui/user-avatar";

const NavControl = () => {
  const { status } = useSession();

  return (
    <div className="flex items-center justify-end flex-1 space-x-4">
      <ThemeToggle />
      {status === "authenticated" ? (
        <UserAvatar />
      ) : (
        <Link
          href="/auth/login"
          className={cn(
            buttonVariants({
              className: "no-underline",
            })
          )}
        >
          Log in
        </Link>
      )}
    </div>
  );
};

export default NavControl;
