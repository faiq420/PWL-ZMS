import type React from "react";
import { SideMenu } from "@/components/Menus/SideMenu";
import Footer from "@/components/Menus/Footer";

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
      <main className="flex-1 h-screen shadow-2xl flex flex-col p-4 pl-0 bg-main-background">
        <div className="flex-1 rounded-lg overflow-auto bg-white/80 border">
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}
