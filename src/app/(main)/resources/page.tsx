import { getCategories } from "entities/category";
import { getResources } from "entities/resources";
import Resources from "page/resources";

export default async function ResourcesPage() {
  const categories = await getCategories();
  const resources = await getResources();

  return (
    <>
      <Resources categories={categories} resources={resources}/>
    </>
  );
}
