"use client";
import type React from "react";
import { SideMenu } from "@/components/Menus/SideMenu";
import Footer from "@/components/Menus/Footer";
import Header from "@/components/Menus/Header";
import "leaflet/dist/leaflet.css";
import useHelper from "@/Helper/helper";
import Unauthorized from "../unauthorized/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const helper = useHelper();
  const pageData = helper.GetPageData();
  return (
    <div className="flex flex-1 flex-col md:flex-row font-faustina bg-main-background overflow-x-hidden">
      <div className="sticky top-0 md:h-screen md:block p-1 pr-0 z-50">
        <SideMenu />
      </div>
      <main className="flex-1 h-screen flex flex-col pr-4 py-1 pl-0">
        <div className="hidden md:block">
          <Header />
        </div>
        <div
          className={`flex flex-col flex-1 rounded-lg overflow-auto w-full md:w-min-[83vw] md:w-max-[95vw] xl:w-min-[85vw]`}
        >
          {/* {!pageData?.permissions.view ? ( */}
            <div className="flex-1 p-4 md:p-5 py-3">{children}</div>
          {/* ) : (
            <div className="flex-1 flex justify-center items-center">
              <Unauthorized />
            </div>
          )} */}
          <Footer />
        </div>
      </main>
    </div>
  );
}
