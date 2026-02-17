"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
// import UserView from "../tabs/user-view";
// import UserCreate from "../tabs/user-create";
const UserView = dynamic(() => import("../tabs/user-view"), { ssr: false });
const UserCreate = dynamic(() => import("../tabs/user-create"), { ssr: false });

export default function UserDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <>
      {params.id !== undefined && Number(params.id) !== 0 ? (
        <UserView id={id} />
      ) : (
        <UserCreate />
      )}
    </>
  );
}
