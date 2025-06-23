import { convertDataForCoordinatorsTable, getCoordinatorsFromApi } from "entities/users";
import Coordinators from "page/coordinators";
import { PAGE_PAGINATION_SETTINGS } from "shared/constants/page";
import { AppProps } from "next/app";

export const dynamic = "force-dynamic";
export default async function FamiliesPage(props: AppProps['pageProps']) {
  const searchParams = await props.searchParams;

  const coordinatorsName = searchParams?.coordinator_name ?? "";
  const phoneNumber = searchParams?.phone_number ?? "";
  const role = searchParams?.role ?? "";
  const sort = searchParams?.sort ? JSON.parse(searchParams?.sort) : null;

  const currentPage = searchParams?.current_page
    ? searchParams?.current_page
    : PAGE_PAGINATION_SETTINGS.default_page;
  const perPage = PAGE_PAGINATION_SETTINGS.per_page;

  const { coordinatorsApiData, totalCount } = await getCoordinatorsFromApi({
    by_phone_number: phoneNumber,
    currentPage: currentPage,
    perPage: perPage,
    full_name_cont: coordinatorsName,
    role_eq: role,
    sort: sort,
  });

  const { coordinatorsTableData, sorterTableObject } =
    convertDataForCoordinatorsTable(coordinatorsApiData);

  return (
    <>
      <Coordinators
        perPage={perPage}
        totalCount={totalCount}
        coordinators={coordinatorsTableData}
        sorterTableObject={sorterTableObject}
      />
    </>
  );
}
