"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, UserCog } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { removeTokenCookie } from "@/lib/cookieToken";
import Logout from "@/Helper/helper";
import useHelper from "@/Helper/helper";

const Header = () => {
  const router = useRouter();
  const helper = useHelper();
  const [userName, setUserName] = useState("Admin User");

  return (
    <div className="flex justify-end items-center min-h-[57px] border-b border-b-[#d7d7d7] px-4 md:px-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-3 h-full items-center">
            <div className="bg-slate-200 rounded-full h-8 w-8 cursor-pointer">
              <Image
                src="/assets/menu/userProfile.svg"
                height={32}
                width={32}
                alt="User"
                className="rounded-full"
              />
            </div>
            <div className="text-sm flex-1 flex flex-col justify-center">
              <div className="flex justify-between">
                <p className="leading-3 font-medium mb-0">Admin User</p>
              </div>
              <p className="text-xs text-muted-foreground mb-0 leading-3">
                ID: xxxxxx
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="font-roboto text-[6px]">
          <DropdownMenuLabel className="text-xs font-medium text-center uppercase truncate">
            {userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/home/change-password")}
          >
            <UserCog className="mr-2 h-3 w-3" />
            <span className="text-xs">Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500"
            onClick={helper.Logout}
          >
            <LogOut className="mr-2 h-3 w-3" />
            <span className="text-xs">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
