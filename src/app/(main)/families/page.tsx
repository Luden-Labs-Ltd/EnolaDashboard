import { convertDataForTable, getFamiliesFromApi } from "entities/families";
import Families from "page/families";
import { PageProps } from "../../../../.next/types/app/layout";
import { getCurrentProfileApi } from "entities/auth";

export const dynamic = "force-dynamic";
export default async function FamiliesPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const profile = await getCurrentProfileApi();
  const programId = profile?.company.programs[0].id ?? "";

  const familiesName = searchParams?.family_name ?? "";

  const familyId = searchParams?.family_id ?? "";
  const isArchived = searchParams?.is_archived ?? false;

  const familiesApi = await getFamiliesFromApi(
    familiesName,
    familyId,
    isArchived
  );
  const families = convertDataForTable(familiesApi);

  return (
    <>
      <Families programId={programId} families={families} />
    </>
  );
}
