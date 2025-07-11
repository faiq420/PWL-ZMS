"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import MenuManagementPage from "./main";
import MenuCreate from "./menu-create";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const crudModes = ["create", "edit"];
  const id = searchParams.get("id") || undefined;
  const mode = searchParams.get("mode") || undefined;

  useEffect(() => {
    if (!mode || !crudModes.includes(mode)) {
      router.replace("/home/menu-management");
    }
  }, [mode]);

  if (!mode || !crudModes.includes(mode)) {
    return <MenuManagementPage />;
  }

  const props = {
    mode: crudModes.includes(mode ?? "") ? mode : "create",
    id,
  };

  switch (mode) {
    case "create":
      return <MenuCreate {...props} />;
    case "edit":
      return <MenuCreate {...props}/>
    default:
      return <p>Invalid mode.</p>;
  }
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageContent />
  </Suspense>
);

export default Page;
