"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { siteConfig, userConfig } from "@/lib/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

const UserAvatar = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={session?.user?.image ?? userConfig.defaultUserImage}
          data-testid="user-avatar"
          width={36}
          height={36}
          alt={session?.user?.name ?? "User"}
          className="object-cover duration-300 rounded-full cursor-pointer hover:ring-4 hover:ring-accent"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/settings"
              className="flex items-center justify-start w-full h-full gap-2"
            >
              <Icons.user className="w-4 h-4" />
              <span>Manage profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/settings/account"
              className="flex items-center justify-start w-full h-full gap-2"
            >
              <Icons.settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={siteConfig.links.github}
            className="flex items-center justify-start w-full h-full gap-2"
          >
            <Icons.gitHub className="w-4 h-4" />
            <span>GitHub</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/support"
            className="flex items-center justify-start w-full h-full gap-2"
          >
            <Icons.lifeBuoy className="w-4 h-4" />
            <span>Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className="flex items-center justify-start w-full gap-3 p-0 text-left border-none"
            onClick={() => signOut()}
          >
            <Icons.logOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
