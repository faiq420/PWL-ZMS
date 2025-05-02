import type React from "react";
import { SideMenu } from "@/components/Menus/SideMenu";
import Footer from "@/components/Menus/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col md:flex-row font-barlow bg-white">
      <div className="sticky top-0 md:h-screen md:block">
        <SideMenu />
      </div>
      <main className="flex-1 h-screen flex flex-col p-4 pl-0 ">
        <div className="flex-1 rounded-lg overflow-auto bg-main-background border">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
