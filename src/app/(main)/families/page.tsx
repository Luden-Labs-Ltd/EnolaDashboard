
import { convertDataForTable, getFamiliesFromApi } from "entities/families";
import Families from "page/families";
import { PageProps } from "../../../../.next/types/app/layout";

export const dynamic = 'force-dynamic';
export default async function FamiliesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const programId = searchParams?.family_name ?? '';
  const familyId = searchParams?.family_id ?? '';
  const isArchived = searchParams?.is_archived ?? false;

  const familiesApi = await getFamiliesFromApi(programId, familyId, isArchived);
  const families = convertDataForTable(familiesApi)

  return (
    <>
      <Families families={families} />
    </>
  );
}
