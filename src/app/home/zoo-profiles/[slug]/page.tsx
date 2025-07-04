"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ZooProfilePage from "./main";
import Location from "./Cruds/Location";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const slug = params.slug;
  const tabs = ["locations", "history", "shows", "animals", "details"];
  const crudModes = ["create", "edit", "view"];
  const activeTab = searchParams.get("tab");
  const id = searchParams.get("id") || undefined;
  const mode = searchParams.get("mode") || undefined;

  useEffect(() => {
    if (!activeTab || !tabs.includes(activeTab)) {
      router.replace(`/home/zoo-profiles/${slug}`);
    }
  }, [activeTab]);

  if (!activeTab || !tabs.includes(activeTab)) {
    return <ZooProfilePage />;
  }

  return activeTab === "locations" ? (
    <Location
      mode={crudModes.includes(mode ?? "") ? mode : "create"}
      tab={activeTab}
      id={id}
    />
  ) : (
    <p>Invalid tab.</p>
  );
};

export default Page;
