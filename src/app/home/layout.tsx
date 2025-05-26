import type React from "react";
import { SideMenu } from "@/components/Menus/SideMenu";
import Footer from "@/components/Menus/Footer";
import Header from "@/components/Menus/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col md:flex-row font-faustina bg-main-background">
      <div className="sticky top-0 md:h-screen md:block p-1 z-[1000]">
        <SideMenu />
      </div>
      <main className="flex-1 h-screen flex flex-col pr-4 py-1 pl-0">
        {/* <Header /> */}
        <div className="flex flex-col flex-1 rounded-lg overflow-auto">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
