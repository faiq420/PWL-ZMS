"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building,
  Calendar,
  FileText,
  Home,
  Info,
  Map,
  MapPin,
  Menu,
  PawPrintIcon as Paw,
  Settings,
  Stethoscope,
  X,
  LogOutIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function SideMenu() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/home",
      icon: <Home className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    },
    {
      title: "Zoo Profiles",
      href: "/home/zoo-profiles",
      icon: <Building className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    },
    {
      title: "Animal Directory",
      href: "/home/animal-directory",
      icon: <Paw className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    },
    {
      title: "Planned Visits",
      href: "/home/visit-planning",
      icon: <Calendar className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    },
    {
      title: "Digital Guide",
      href: "/home/digital-guide",
      icon: <Info className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    },
    // {
    //   title: "Visitor Services",
    //   href: "/home/visitor-services",
    //   icon: <MapPin className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    // },
    {
      title: "Veterinary Inspection",
      href: "/home/veterinary-inspection",
      icon: (
        <Stethoscope className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />
      ),
    },
  ];

  return (
    <>
      <div className="md:hidden flex items-center h-16 px-4 z-50 font-faustina bg-white">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 className="font-semibold">ZMS</h1>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden font-syne">
          <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background shadow-lg">
            <div className="flex items-center justify-between h-16 px-6 border-b">
              <h2 className="font-semibold">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="py-4">
              <nav className="grid gap-1 px-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-main-jungleGreen",
                      pathname === item.href
                        ? "bg-main-jungleGreen/10 font-medium text-main-jungleGreen"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`h-screen hidden pt-4 bg-white md:block ${
          isCollapsed ? "md:w-[5vw]" : "md:w-[17vw]"
        } xl:w-[10vw] font-syne transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div
            className={`flex ${
              isCollapsed ? "flex-col" : "flex-row-reverse"
            } h-14 items-center px-4 justify-between`}
          >
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
            <Link
              href="/home"
              className="flex items-center gap-2 font-semibold"
            >
              <Image src={"/PWL_logo.png"} height={30} width={30} alt="Logo" />
              {!isCollapsed && (
                <span className="uppercase tracking-tighter text-4xl leading-5">
                  ZMS
                </span>
              )}
            </Link>
          </div>
          <div className="flex-1 overflow-auto flex flex-col py-2">
            <nav className="grid gap-1 px-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center h-fit gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-gray-900",
                    pathname === item.href
                      ? "bg-main-background/50 font-medium text-black"
                      : "text-muted-foreground",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  {item.icon}
                  {!isCollapsed && item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto pl-2 py-[6px] w-full">
            <div
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                isCollapsed ? "justify-center flex-col" : ""
              }`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className={`h-8 w-8 cursor-pointer rounded-full`}>
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                      className="rounded-full"
                    />
                    <AvatarFallback>{"Admin"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                {/* <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500"
                    onClick={() => {
                      localStorage.clear();
                      // router.push("/");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent> */}
              </DropdownMenu>
              {!isCollapsed && (
                <div className="text-sm flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Admin User</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    admin@zoosystem.com
                  </p>
                </div>
              )}
            </div>
            <Link
              href={"/"}
              className={cn(
                "flex-1 flex items-end gap-3 rounded-lg px-5 py-2 text-sm transition-all hover:text-gray-900 text-muted-foreground space-x-3",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <LogOut className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />
              {!isCollapsed && <span>Logout</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
