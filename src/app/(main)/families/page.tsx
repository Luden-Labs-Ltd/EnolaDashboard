import { convertDataForTable, getFamiliesFromApi } from "entities/families";
import Families from "page/families";
import { PAGE_PAGINATION_SETTINGS } from "shared/constants/page";
import { AppProps } from "next/app";

export const dynamic = "force-dynamic";
export default async function FamiliesPage(props: AppProps['pageProps']) {
  const searchParams = await props.searchParams;

  const familiesName = searchParams?.family_name ?? "";
  const familyId = searchParams?.family_id ?? "";
  const isArchived = searchParams?.is_archived === "true" ? true : false ;
  const isMyFamilies = searchParams?.is_my_families === "true" ? true : false ;
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
    isMyFamilies,
    sort: sort,
  });
  const { familiesTableData, sorterTableObject } =
    convertDataForTable(familiesApiData);

  return (
    <>
      <Families
        perPage={perPage}
        totalCount={totalCount}
        families={familiesTableData}
        sorterTableObject={sorterTableObject}
      />
    </>
  );
}
