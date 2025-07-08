"use client";

import { useParams, useRouter } from "next/navigation";
import UserView from "../tabs/user-view";
import UserCreate from "../tabs/user-create";

export default function UserDetailPage() {
  const params = useParams();
  
  return(
    <>
      {params.id !== undefined && Number(params.id) !== 0 ? (
        <UserView userId={Number(params.id)}/>
      ): (
        <UserCreate />
      )
      }
    </>
  );
}
