import { convertCategoryData, getCategoriesApi } from "entities/category";
import { convertResourcesData, getResourcesFromApi } from "entities/resources";
import { getLocale } from "next-intl/server";
import { AppProps } from "next/app";
import Resources from "page/resources";
import { Tasks } from 'page/tasks'

export const dynamic = "force-dynamic";
export default async function ResourcesPage(props: AppProps["pageProps"]) {
  const searchParams = await props.searchParams;

  const resourceName = searchParams?.resource_name ?? "";
  const categoryId = searchParams?.category_id ?? "";

  const categoriesApiData = await getCategoriesApi();
  const resourcesApiData = await getResourcesFromApi({
    resourceName,
    categoryId,
  });

  const { categoriesData, maxResourceCount, maxTaskCount } =
    convertCategoryData(categoriesApiData);
  const resourcesData = convertResourcesData(resourcesApiData);
  const locale = await getLocale();

  return (
    <>
      <Tasks />
    </>
  );
}
