import { getCurrentProfileApi } from "entities/auth";
import { convertCategoryData, getCategoriesApi } from "entities/category";
import { convertTasksData, getTasks } from "entities/task";
import SearchPanel from "features/search-panel";
import Needs from "page/needs";

export default async function NeedsPage() {
  const profile = await getCurrentProfileApi();
  const programId = profile?.company.programs[0].id ?? null;

  const categoriesApiData = await getCategoriesApi(programId);
  const categories = convertCategoryData(categoriesApiData);

  const tasksApiData = await getTasks(programId);
  const tasks = convertTasksData(tasksApiData);

  return (
    <main>
      <SearchPanel searchParamName="task_name" />
      <Needs categories={categories} programId={programId} tasks={tasks} />
    </main>
  );
}
