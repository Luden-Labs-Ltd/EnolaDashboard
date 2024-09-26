import { getDashboardInfo } from "./actions";
import Cards from "./widgets/Cards";
import CharWithFilters from "./widgets/CharWithFilters/CharWithFilters";

export default async function DashboardPage() {
  const data = await getDashboardInfo();
  return (
    <main>
      <Cards />
      <CharWithFilters />
    </main>
  );
}
