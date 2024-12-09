import { getCategories } from "entities/category";
import { getTasks } from "entities/task";
import SearchPanel from "features/search-panel";
import Needs from "page/needs";


export default async function NeedsPage() {
  const categories = await getCategories()
  const tasks = await getTasks()

  return (
    <main>
      <SearchPanel searchParamName="task_name" />
      <Needs categories={categories} tasks={tasks} />
    </main>
  );
}
