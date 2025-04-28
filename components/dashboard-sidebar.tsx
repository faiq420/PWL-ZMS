"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils"
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
} from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Zoo Profiles",
    href: "/dashboard/zoo-profiles",
    icon: <Building className="h-5 w-5" />,
  },
  {
    title: "Animal Directory",
    href: "/dashboard/animal-directory",
    icon: <Paw className="h-5 w-5" />,
  },
  {
    title: "Visit Planning",
    href: "/dashboard/visit-planning",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Digital Guide",
    href: "/dashboard/digital-guide",
    icon: <Info className="h-5 w-5" />,
  },
  {
    title: "Visitor Services",
    href: "/dashboard/visitor-services",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Veterinary Inspection",
    href: "/dashboard/veterinary-inspection",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className="md:hidden flex items-center h-16 px-4 border-b">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 className="font-semibold">Zoo Management System</h1>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background shadow-lg">
            <div className="flex items-center justify-between h-16 px-6 border-b">
              <h2 className="font-semibold">Navigation</h2>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
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
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                      pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
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
      <div className="hidden border-r bg-gray-50 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Map className="h-6 w-6 text-green-700" />
              <span>Zoo Management</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                    pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="rounded-full bg-green-100 p-1">
                <Paw className="h-4 w-4 text-green-700" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@zoosystem.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
