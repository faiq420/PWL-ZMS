"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import VisitPlanningPage from "./main";
import Events from "./Events";
import Group from "./Group";
import Bookings from "./Bookings";

const PageContent = () => {
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

  const props = {
    mode: crudModes.includes(mode ?? "") ? mode : "create",
    tab: activeTab,
    id,
  };

  switch (activeTab) {
    case "event":
      return <Events {...props} />;
    case "group-visit":
      return <Group {...props} />;
    case "booking":
      return <Bookings {...props} />;
    default:
      return <p>Invalid tab.</p>;
  }
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageContent />
  </Suspense>
);

export default Page;
