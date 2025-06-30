"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import VisitPlanningPage from "./main";
import Events from "./Events";
import Group from "./Group";
import Bookings from "./Bookings";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabs = ["event", "group-visit", "booking"];
  const crudModes = ["create", "edit", "view"];
  const activeTab = searchParams.get("tab");
  const id = searchParams.get("id") || undefined;
  const mode = searchParams.get("mode") || undefined;

  useEffect(() => {
    if (!activeTab || !tabs.includes(activeTab)) {
      router.replace("/home/visit-planning");
    }
  }, [activeTab]);

  if (!activeTab || !tabs.includes(activeTab)) {
    return <VisitPlanningPage />;
  }

  return activeTab === "event" ? (
    <Events />
  ) : activeTab === "group-visit" ? (
    <Group />
  ) : activeTab === "booking" ? (
    <Bookings
      mode={crudModes.includes(mode ?? "") ? mode : "create"}
      tab={activeTab}
      id={id}
    />
  ) : (
    <p>Invalid tab.</p>
  );
};

export default Page;
