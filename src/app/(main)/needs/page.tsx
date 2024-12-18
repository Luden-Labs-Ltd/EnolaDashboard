import { getCurrentProfileApi } from "entities/auth";
import { convertCategoryData, getCategoriesApi } from "entities/category";
import { convertTasksData, getTasks } from "entities/task";
import SearchPanel from "features/search-panel";
import Needs from "page/needs";
import { PageProps } from "../../../../.next/types/app/layout";

export const dynamic = 'force-dynamic';
export default async function NeedsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const profile = await getCurrentProfileApi();
  const programId = profile?.company.programs[0].id ?? null;
  const resourceName = searchParams?.task_name ?? "";

  const categoriesApiData = await getCategoriesApi(programId);
  const categories = convertCategoryData(categoriesApiData);

  const tasksApiData = await getTasks(programId, {
    taskName: resourceName
  });
  const tasks = convertTasksData(tasksApiData);

  return (
    <main>
      <SearchPanel searchParamName="task_name" />
      <Needs categories={categories} programId={programId} tasks={tasks} />
    </main>
  );
}
