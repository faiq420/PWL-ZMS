"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import UserManagementPage from "./main";
import UserView from "./tabs/user-view";
import UserCreate from "./tabs/user-create";

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const crudModes = ["create", "edit", "view"];
  const id = searchParams.get("id") || undefined;
  const mode = searchParams.get("mode") || undefined;

  useEffect(() => {
    if (!mode || !crudModes.includes(mode)) {
      router.replace("/home/user-management");
    }
  }, [mode]);

  if (!mode || !crudModes.includes(mode)) {
    return <UserManagementPage />;
  }

  const props = {
    mode: crudModes.includes(mode ?? "") ? mode : "create",
    id,
  };

  switch (mode) {
    case "view":
      return <UserView userId={id ? Number(id) : 0} />;
    case "create":
      return <UserCreate {...props} />;
    case "edit":
      return <UserCreate {...props}/>
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
