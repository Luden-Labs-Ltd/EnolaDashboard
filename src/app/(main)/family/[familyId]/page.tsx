"use client";
import { convertSingleFamilyData, FamilyStoreProvider, FamilyType } from "entities/families";
import { getFamilyById } from "entities/families/api";
import { useParams } from "next/navigation";
import { Family } from "page/family";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const familyId = params.familyId as string;

  const [family, setFamily] = useState<FamilyType | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getFamilyById(familyId);
      if (!data) {
        return
      }
      const family = convertSingleFamilyData(data)
      setFamily(family);
    };
    getData();
  }, [familyId]);

  if (!family) {
    return <div>login....</div>
  }

  return (
    <FamilyStoreProvider family={family}>
      <Family familyId={familyId} />
    </FamilyStoreProvider>
  );
}
