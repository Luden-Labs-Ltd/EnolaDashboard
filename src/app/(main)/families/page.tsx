import { getFamilies } from "entities/families";
import Families from "page/families";

export default async function FamiliesPage() {
  const families = await getFamilies();

  return (
    <>
      <Families families={families} />
    </>
  );
}
