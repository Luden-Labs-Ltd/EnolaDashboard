import { convertDataForCoordinatorsTable, CoordinatorType, getCoordinatorsFromApi } from "entities/users";
import Coordinators from "page/coordinators";
import { PAGE_PAGINATION_SETTINGS } from "shared/constants/page";
import { AppProps } from "next/app";
import { getCurrentProfileApi } from "entities/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";
export default async function FamiliesPage(props: AppProps['pageProps']) {
  const searchParams = await props.searchParams;
  const profile = await getCurrentProfileApi()
  const isUserAdmin = profile?.role === 'admin'
  const programs = profile?.company.programs ?? []
  const t = await getTranslations();

  if (!isUserAdmin) {
    redirect('/dashboard')
  }

  const coordinatorsName = searchParams?.coordinator_name ?? "";
  const phoneNumber = searchParams?.phone_number ?? "";
  const role = searchParams?.role ?? "";
  const programId = searchParams?.program_id ?? "";
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
    program_id: programId,
    sort: sort,
  });

  const { coordinatorsTableData, sorterTableObject } =
    convertDataForCoordinatorsTable(coordinatorsApiData, programs, t);

  return (
    <>
      <Coordinators
        perPage={perPage}
        totalCount={totalCount}
        coordinators={coordinatorsApiData as unknown as CoordinatorType[]}
        sorterTableObject={sorterTableObject}
        programs={programs}
        tableData={coordinatorsTableData}
      />
    </>
  );
}
