"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import DigitalGuidePage from "./Main";
import FeaturedAnimals from "./windows/FeaturedAnimals";
import DailySchedule from "./windows/DailySchedule";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = ["featuredAnimals", "dailySchedule"];
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
    return <DigitalGuidePage />;
  }

  const props = {
    mode: crudModes.includes(mode ?? "") ? mode : "create",
    tab: activeTab,
    id,
  };

  switch (activeTab) {
    case "featuredAnimals":
      return <FeaturedAnimals {...props} />;
    case "dailySchedule":
      return <DailySchedule {...props} />;
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
