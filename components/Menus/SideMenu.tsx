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
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/home",
    icon: <Home className="h-3 w-3" />,
  },
  {
    title: "Zoo Profiles",
    href: "/home/zoo-profiles",
    icon: <Building className="h-3 w-3" />,
  },
  {
    title: "Animal Directory",
    href: "/home/animal-directory",
    icon: <Paw className="h-3 w-3" />,
  },
  {
    title: "Visit Planning",
    href: "/home/visit-planning",
    icon: <Calendar className="h-3 w-3" />,
  },
  {
    title: "Digital Guide",
    href: "/home/digital-guide",
    icon: <Info className="h-3 w-3" />,
  },
  {
    title: "Visitor Services",
    href: "/home/visitor-services",
    icon: <MapPin className="h-3 w-3" />,
  },
  {
    title: "Veterinary Inspection",
    href: "/home/veterinary-inspection",
    icon: <Stethoscope className="h-3 w-3" />,
  },
];

export function SideMenu() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center h-16 px-4 border-b z-50 bg-white font-faustina">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 className="font-semibold">Zoo Management System</h1>
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
      <div className="h-screen hidden border-r bg-gray-50 md:block md:w-[20vw] xl:w-[15vw] font-syne">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <Link
              href="/home"
              className="flex items-center gap-2 font-semibold"
            >
              <Image src={"/PWL_logo.png"} height={30} width={30} alt="Logo" />
              <span className="uppercase tracking-tighter text-lg">
                Zoo Management
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-main-jungleGreen",
                    pathname === item.href
                      ? "bg-main-jungleGreen/5 font-medium text-main-jungleGreen"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t w-full">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="rounded-full bg-main-safariBrown/30 p-1">
                <Paw className="h-4 w-4 text-main-safariBrown" />
              </div>
              <div className="text-sm w-full">
                <div className="flex justify-between">
                  <p className="font-medium">Admin User</p>
                  <LogOutIcon className="h-5 w-5 text-red-600 bg-red-200 cursor-pointer rounded-md p-1" />
                </div>
                <p className="text-xs text-muted-foreground">
                  admin@zoosystem.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
