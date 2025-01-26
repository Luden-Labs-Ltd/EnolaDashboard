import { convertCategoryData, getCategoriesApi } from "entities/category";
import { convertTasksData, getTasks } from "entities/task";
import SearchPanel from "features/search-panel";
import Needs from "page/needs";
import { PageProps } from "../../../../.next/types/app/page";

export const dynamic = "force-dynamic";
export default async function NeedsPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const resourceName = searchParams?.task_name ?? "";

  const categoriesApiData = await getCategoriesApi();

  const { categoriesData, maxResourceCount, maxTaskCount } =
    convertCategoryData(categoriesApiData);

  const tasksApiData = await getTasks({
    taskName: resourceName,
  });
  const tasks = convertTasksData(tasksApiData);

  return (
    <main>
      <SearchPanel searchParamName="task_name" />
      <Needs
        maxResourceCount={maxResourceCount}
        maxTaskCount={maxTaskCount}
        categories={categoriesData}
        tasks={tasks}
      />
    </main>
  );
}
