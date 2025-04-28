import type React from "react";
import { DashboardSidebar } from "../../../components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <DashboardSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
