import SearchPanel from "./feauture/SearchPanel";
import NeedsContent from "./widget";
import { getCategories } from "./lib";


export default async function NeedsPage() {

  const categories = await getCategories()

  return (
    <main>
      <SearchPanel />
      <NeedsContent categories={categories} />
    </main>
  );
}
