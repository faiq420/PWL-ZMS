"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Building,
  Calendar,
  Home,
  Info,
  MapPin,
  Menu,
  PawPrintIcon as Paw,
  Stethoscope,
  X,
  LogOut,
  User,
  TowerControl,
  UserCog,
  Logs,
  HomeIcon,
  Clock,
  ArrowRight,
  ArrowLeft,
  Binoculars,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import typographyIcon from "@/public/assets/logos/Punjab_wildlife_logo.svg";
import collapsedIcon from "@/public//assets/logos/sidemenu_icon.png";
import { getCookieKey, removeTokenCookie } from "@/lib/cookieToken";
import useHelper from "@/Helper/helper";
import { iconOptions } from "@/data/zoos";
import { useSelector } from "react-redux";

type TooltipState = {
  index: number | null;
  position: { top: number; left: number } | null;
};

type RootState = {
  menu: {
    items: Array<{ href: string; MenuName: string; iconName: string }>;
  };
};

export function SideMenu() {
  const router = useRouter();
  const helper = useHelper();
  const [userName, setUserName] = useState("");
  const [subDetail, setSubDetail] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(getCookieKey("userDetails") || "");
    if (userDetails) {
      setUserName(userDetails.UserName);
      setSubDetail(userDetails.UserCnic);
    }
  }, []);
  const pathname = usePathname();
  const [tooltip, setTooltip] = useState<TooltipState>({
    index: null,
    position: null,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const [sidebarItems, setSidebarItems] = useState<any[]>([]);
  const sidebarItems = useSelector((state: RootState) => state.menu.items);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    if (!isCollapsed || !iconRefs.current[index]) return;

    const rect = iconRefs.current[index]!.getBoundingClientRect();
    setTooltip({
      index,
      position: {
        top: rect.top + window.scrollY + rect.height / 2 - 12, // center vertically
        left: rect.right + 8, // small gap to right
      },
    });
  };

  const handleMouseLeave = () => setTooltip({ index: null, position: null });

  const isActiveURL = (href: string) => {
    const pathInitial = "/" + pathname.split("/").slice(1, 3).join("/");
    return href == pathInitial;
  };

  // useEffect(() => {
  //   if (typeof window != undefined) {
  //     const menuItems = JSON.parse(helper.getData("menu_items"));
  //     setSidebarItems(menuItems);
  //   }
  // }, []);

  return (
    <>
      <div className="md:hidden flex items-center h-16 px-4 z-10 font-roboto bg-transparent">
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
        <div className="fixed inset-0 z-[1000] bg-white/80 backdrop-blur-sm md:hidden font-roboto">
          <div className="bg-white">
            <div className="fixed inset-y-0 left-0 z-[1000] w-3/4 max-w-xs bg-transparent shadow-lg flex flex-col bg-white">
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
                  {sidebarItems.map((item) => {
                    const IconComponent =
                      iconOptions[item.iconName as keyof typeof iconOptions];
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-main-darkOrange",
                          isActiveURL(item.href)
                            ? "bg-[#CBE88C] font-medium text-black"
                            : "text-muted-foreground hover:text-black/70"
                        )}
                      >
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        {item.MenuName}
                      </Link>
                    );
                  })}
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
                  </DropdownMenu>
                  <div className="text-sm flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{userName}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{subDetail}</p>
                  </div>
                </div>
                <Link
                  href={"/home/change-password"}
                  className={
                    "flex-1 flex items-end gap-3 rounded-lg px-5 py-2 text-xs transition-all hover:text-gray-900 text-muted-foreground space-x-3"
                  }
                >
                  <UserCog className={`h-3 w-3`} />
                  <span>Change Password</span>
                </Link>
                <div
                  onClick={() => {
                    removeTokenCookie();
                    router.push("/");
                  }}
                  className={
                    "flex-1 flex items-end gap-3 rounded-lg px-5 py-2 text-xs transition-all hover:text-gray-900 text-muted-foreground space-x-3"
                  }
                >
                  <LogOut className={`h-3 w-3`} />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`h-full hidden rounded-md bg-transparent border border-main-borderColor md:block ${
          isCollapsed ? "md:w-[5vw]" : "md:w-[17vw] xl:w-[15vw]"
        } font-roboto transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div
            className={`flex relative border-b border-b-main-borderColor ${
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
              style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }}
              className="p-1 rounded-full border absolute top-11 -right-3 bg-transparent"
            >
              {isCollapsed ? (
                <ArrowRight size={12} color="#737373" />
              ) : (
                <ArrowLeft size={12} color="#737373" />
              )}
            </button>
            <Link
              href="/home"
              className="flex items-center gap-2 font-semibold h-full"
            >
              {isCollapsed ? (
                <Image src={collapsedIcon} alt="Logo" />
              ) : (
                <Image src={typographyIcon} alt="Logo" />
              )}
            </Link>
          </div>
          <div className="flex-1 flex flex-col py-2">
            <nav className="grid overflow-auto max-h-[calc(100vh-90px)] gap-1 px-2">
              {sidebarItems.map((item, index) => {
                const isActive = tooltip.index === index;
                const IconComponent =
                  iconOptions[item.iconName as keyof typeof iconOptions];
                return (
                  <div key={index}>
                    <Link
                      ref={(el) => {
                        iconRefs.current[index] = el;
                      }}
                      href={item.href}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className={cn(
                        "flex relative group items-center h-fit gap-3 rounded-lg px-3 py-2 text-xs transition-all",
                        isActiveURL(item.href)
                          ? "bg-[#CBE88C] font-medium text-black"
                          : "text-muted-foreground hover:text-black/70",
                        isCollapsed ? "justify-center" : ""
                      )}
                    >
                      {IconComponent && (
                        <IconComponent
                          className={`${isCollapsed ? "h-4 w-4" : "h-3 w-3"}`}
                        />
                      )}
                      {!isCollapsed && item.MenuName}
                    </Link>
                    {isCollapsed &&
                      isActive &&
                      tooltip.position &&
                      createPortal(
                        <div
                          className="fixed bg-[#CBE88C] text-black px-2 py-1 rounded z-[1001] text-xs font-medium shadow-xl whitespace-nowrap"
                          style={{
                            top: tooltip.position.top,
                            left: tooltip.position.left,
                          }}
                        >
                          {item.MenuName}
                          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-[#CBE88C]" />
                        </div>,
                        document.body
                      )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
