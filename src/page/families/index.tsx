import Row from "@components/Row";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { FamiliesStoreProvider, FamilyType } from "entities/families";
import { AddFamily } from "features/add-family";
import SearchPanel from "features/search-panel";
import React from "react";
import FamiliesTable from "./ui/FamiliesTable";
import { SearchFilter } from "./ui/SearchFilter/SearchFilter";
import { SorterObject } from "shared/types/sort";
import { ShowMyFamily } from "features/show-my-family";
interface FamiliesProps {
  families: FamilyType[];
  sorterTableObject: SorterObject;
  perPage: number;
  totalCount: number;
}
const Families: React.FC<FamiliesProps> = ({
  families,
  sorterTableObject,
  perPage,
  totalCount,
}) => {
  return (
    <main>
      <FamiliesStoreProvider families={families}>
        <SearchPanel
          filterForm={<SearchFilter />}
          actions={<ShowMyFamily/>}
          searchParamName="family_name"
        >
          <Row alignItems="center">
            <AddFamily />
          </Row>
        </SearchPanel>
        <ScrollArea className="h-[79vh] w-full border p-4">
          <FamiliesTable
            totalCount={totalCount}
            perPage={perPage}
            sorterTableObject={sorterTableObject}
          />
        </ScrollArea>
      </FamiliesStoreProvider>
    </main>
  );
};

export default Families;
