"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import VisitorServicesPage from "./main";
import FoodCourt from "./Cruds/FoodCourt";
import Cafetaria from "./Cruds/Cafetaria";
import Safety from "./Cruds/Safety";
import Facility from "./Cruds/Facility";
import FirstAid from "./Cruds/FirstAid";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    "food-court",
    "restaurant-canteen-cart",
    "Facilities",
    "First_Aid",
    "Safety",
  ];
  const crudModes = ["create", "edit", "view"];
  const activeTab = searchParams.get("tab");
  const id = searchParams.get("id") || undefined;
  const mode = searchParams.get("mode") || undefined;

  useEffect(() => {
    console.log(activeTab);
    if (!activeTab || !tabs.includes(activeTab)) {
      router.replace("/home/visitor-services");
    }
  }, [activeTab]);

  if (!activeTab || !tabs.includes(activeTab)) {
    return <VisitorServicesPage />;
  }

  const props = {
    mode: crudModes.includes(mode ?? "") ? mode : "create",
    tab: activeTab,
    id,
  };

  switch (activeTab) {
    case "food-court":
      return <FoodCourt {...props} />;
    case "restaurant-canteen-cart":
      return <Cafetaria {...props} />;
    case "Facilities":
      return <Facility {...props} />;
    case "Safety":
      return <Safety {...props} />;
    case "First_Aid":
      return <FirstAid {...props} />;
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
