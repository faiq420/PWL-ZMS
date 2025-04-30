import type React from "react";
import { SideMenu } from "@/components/Menus/SideMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col md:flex-row font-barlow">
      <div className="sticky top-0 md:h-screen md:block">
        <SideMenu />
      </div>
      <main className="flex-1 flex flex-col overflow-auto">{children}</main>
    </div>
  );
}
