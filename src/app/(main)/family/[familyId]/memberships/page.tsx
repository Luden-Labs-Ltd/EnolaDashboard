"use client";

import {
  convertDataForTable,
  getMembershipsFromApi,
  MembershipApi,
  MembershipStoreProvider,
} from "entities/memberships";
import { useParams } from "next/navigation";
import MembershipsPage from "page/memberships";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const familyId = params.familyId as string;
  const [memberships, setMemberships] = useState<MembershipApi[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getMembershipsFromApi(familyId);
      if (!data) {
        return;
      }
      setMemberships(data);
    };
    getData();
  }, [familyId]);

  if (!memberships) {
    return <div>login....</div>;
  }
  


  const membershipsData = convertDataForTable(memberships);

  return (
    <MembershipStoreProvider memberships={membershipsData}>
      <MembershipsPage />
    </MembershipStoreProvider>
  );
}
