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
  User,
  TowerControl,
  UserCog,
  PanelLeftOpen,
  PanelRightOpen,
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
import typographyIcon from "@/public/assets/logos/sidemenu_typography.svg";

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
    {
      title: "Visitor Services",
      href: "/home/visitor-services",
      icon: <MapPin className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    },
    {
      title: "Veterinary Inspection",
      href: "/home/veterinary-inspection",
      icon: (
        <Stethoscope className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />
      ),
    },
    {
      title: "User Management",
      href: "/home/user-management",
      icon: <User className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    },
    {
      title: "Menu Management",
      href: "/home/menu-management",
      icon: <Menu className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    },
    {
      title: "Role Management",
      href: "/home/role-management",
      icon: <UserCog className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />,
    },
    {
      title: "Access Control",
      href: "/home/access-control",
      icon: (
        <TowerControl className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`} />
      ),
    },
  ];

  return (
    <>
      <div className="md:hidden flex items-center h-16 px-4 z-10 font-roboto bg-main-background">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <Image src={typographyIcon} className="w-[20%]" alt="Logo" />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[1000] bg-background/80 backdrop-blur-sm md:hidden font-roboto">
          <div className="isolate">
            <div className="fixed inset-y-0 left-0 z-[1000] w-3/4 max-w-xs bg-background shadow-lg flex flex-col">
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
              <div className="py-4 flex-1">
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
              <div className="mt-auto pl-2 py-[6px] w-full">
                <div className={`flex items-center gap-3 rounded-lg px-3 py-2`}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="h-8 w-8 bg-slate-200 rounded-full cursor-pointer">
                        <Image
                          src="/assets/menu/userProfile.svg"
                          height={32}
                          width={32}
                          className="rounded-full"
                          alt="User"
                        />
                      </div>
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
                  <div className="text-sm flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">Admin User</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      admin@zoosystem.com
                    </p>
                  </div>
                </div>
                <Link
                  href={"/"}
                  className={
                    "flex-1 flex items-end gap-3 rounded-lg px-5 py-2 text-xs transition-all hover:text-gray-900 text-muted-foreground space-x-3"
                  }
                >
                  <LogOut className={`h-3 w-3`} />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`h-full hidden rounded-md bg-main-background md:block border border-main-borderColor ${
          //
          isCollapsed ? "md:w-[5vw]" : "md:w-[17vw] xl:w-[15vw]"
        } font-roboto transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div
            className={`flex border-b border-b-main-borderColor ${
              //
              isCollapsed ? "flex-col" : "flex-row-reverse"
            } h-14 items-center px-4 justify-between`}
          >
            <button
              onClick={() => {
                setIsCollapsed(!isCollapsed);
                window.localStorage.setItem(
                  "screenSize",
                  isCollapsed ? (window.innerWidth >= 768 ? "83" : "85") : "5"
                );
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              {!isCollapsed ? (
                <PanelRightOpen size={20} color="#737373" />
              ) : (
                <PanelLeftOpen size={20} color="#737373" />
              )}
            </button>
            <Link
              href="/home"
              className="flex items-center gap-2 font-semibold"
            >
              {isCollapsed && (
                <Image
                  src={"/assets/logos/sidemenu_icon.svg"}
                  height={30}
                  width={30}
                  alt="Logo"
                />
              )}
              {!isCollapsed && (
                // <span className="uppercase text-4xl leading-5 font-montserrat font-semibold">
                //   ZMS
                // </span>
                <Image src={typographyIcon} className="w-[60%]" alt="Logo" />
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
                    "flex items-center h-fit gap-3 rounded-lg px-3 py-2 text-xs transition-all hover:text-black/70",
                    pathname === item.href
                      ? "bg-[#CBE88C] font-medium text-black"
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
        </div>
      </div>
    </>
  );
}
