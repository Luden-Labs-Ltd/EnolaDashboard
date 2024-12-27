import { convertDataForTable, getFamiliesFromApi } from "entities/families";
import Families from "page/families";
import { PageProps } from "../../../../.next/types/app/layout";
import { getCurrentProfileApi } from "entities/auth";
import { PAGE_PAGINATION_SETTINGS } from "shared/constants/page";

export const dynamic = "force-dynamic";
export default async function FamiliesPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const profile = await getCurrentProfileApi();
  const programId = profile?.company.programs[0].id ?? "";

  const familiesName = searchParams?.family_name ?? "";
  const familyId = searchParams?.family_id ?? "";
  const isArchived = searchParams?.is_archived ?? false;
  const sort = searchParams?.sort ? JSON.parse(searchParams?.sort) : null;

  const currentPage = searchParams?.current_page
    ? searchParams?.current_page
    : PAGE_PAGINATION_SETTINGS.default_page;
  const perPage = PAGE_PAGINATION_SETTINGS.per_page;

  const { familiesApiData, totalCount } = await getFamiliesFromApi({
    currentPage: currentPage,
    perPage: perPage,
    familyName: familiesName,
    familyId: familyId,
    isArchived,
    sort: sort,
  });
  const { familiesTableData, sorterTableObject } =
    convertDataForTable(familiesApiData);

  return (
    <>
      <Families
        programId={programId}
        perPage={perPage}
        totalCount={totalCount}
        families={familiesTableData}
        sorterTableObject={sorterTableObject}
      />
    </>
  );
}
