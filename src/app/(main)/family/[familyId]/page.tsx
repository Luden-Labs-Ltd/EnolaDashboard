"use client";
import { convertSingleFamilyData, FamilyContextState, FamilyStoreProvider, getFamilyById } from "entities/families";
import { useParams } from "next/navigation";
import { Family } from "page/family";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const familyId = params.familyId as string;

  const [data, setData] = useState<FamilyContextState | null>(null);

  useEffect(() => {
    const getData = async () => {
      const apiFamily = await getFamilyById(familyId);
      if (!apiFamily) {
        return
      }
      const data = convertSingleFamilyData(apiFamily)
      setData(data);
    };
    getData();
  }, [familyId]);

  if (!data) {
    return <div>login....</div>
  }

  return (
    <FamilyStoreProvider data={data}>
      <Family familyId={familyId} />
    </FamilyStoreProvider>
  );
}
