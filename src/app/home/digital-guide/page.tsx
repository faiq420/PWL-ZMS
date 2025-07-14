"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import VisitPlanningPage from "./main";
import ScanLearnTable from "./windows/ScanLearnTable";
import AudioGuideTable from "./windows/AudioGuideTable";
import FeaturedAnimalsTable from "./windows/FeaturedAnimalsTable";
import DailyScheduleTable from "./windows/DailyScheduleTable";
import AudioGuide from "./tabs/AudioGuide";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    "scan_learn",
    "audio",
    "featured_animals",
    "daily_schedule",
  ];
  const crudModes = ["create", "edit", "view"];
  const activeTab = searchParams.get("tab");
  const id = searchParams.get("id") || undefined;
  const mode = searchParams.get("mode") || undefined;

  useEffect(() => {
    if (!activeTab || !tabs.includes(activeTab)) {
      router.replace("/home/digital-guide");
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
    case "scan_learn":
      return <ScanLearnTable />;
    case "audio":
      return <AudioGuide {...props} />;
    case "featured_animals":
      return <FeaturedAnimalsTable />;
    case "daily_schedule":
      return <DailyScheduleTable />;
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
