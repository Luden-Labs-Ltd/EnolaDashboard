import { convertCategoryData, getCategoriesApi } from "entities/category";
import { convertResourcesData, getResourcesFromApi } from "entities/resources";
import Resources from "page/resources";
import { PageProps } from "../../../../.next/types/app/layout";

export const dynamic = "force-dynamic";
export default async function ResourcesPage(props: PageProps) {
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

  return (
    <>
      <Resources
        maxResourceCount={maxResourceCount}
        maxTaskCount={maxTaskCount}
        categories={categoriesData}
        resources={resourcesData}
      />
    </>
  );
}
