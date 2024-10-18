
import { convertDataForTable, getFamiliesFromApi } from "entities/families";
import Families from "page/families";

export default async function FamiliesPage() {
  const familiesApi = await getFamiliesFromApi();
  const families = convertDataForTable(familiesApi)

  return (
    <>
      <Families families={families} />
    </>
  );
}
