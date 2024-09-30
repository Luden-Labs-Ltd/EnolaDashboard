import { getDashboardInfo } from "./actions";
import CharWithFilters from "./feautures/CharWithFilters/CharWithFilters";
import Cards from "./widgets/Cards";

export default async function DashboardPage() {
  const data = await getDashboardInfo();
  return (
    <main>
      <Cards />
      <CharWithFilters />
    </main>
  );
}
