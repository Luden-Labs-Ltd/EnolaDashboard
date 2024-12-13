import { getCurrentProfileApi } from "entities/auth";
import { convertCategoryData, getCategoriesApi } from "entities/category";
import { getResources } from "entities/resources";
import Resources from "page/resources";

export const dynamic = 'force-dynamic';
export default async function ResourcesPage() {
  const profile = await getCurrentProfileApi();
  const programId = profile?.company.programs[0].id ?? null;

  const categoriesApiData = await getCategoriesApi(programId);
  const categories = convertCategoryData(categoriesApiData);

  const resources = await getResources();

  return (
    <>
      <Resources categories={categories} resources={resources}/>
    </>
  );
}
