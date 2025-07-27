import Row from "@components/Row";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { CoordinatorType } from "entities/users";
import SearchPanel from "features/search-panel";
import React from "react";
import { SorterObject } from "shared/types/sort";
import { CoordinatorsStoreProvider } from "entities/users/model/providerCoordinators";
import CoordinatorsTable from "./ui/CoordinatorsTable";
import { AddCoordinator } from "features/add-coordinator";


interface CoordinatorsProps {
  coordinators: CoordinatorType[];
  sorterTableObject: SorterObject;
  perPage: number;
  totalCount: number;
}
const Coordinators: React.FC<CoordinatorsProps> = ({
  coordinators,
  sorterTableObject,
  perPage,
  totalCount,
}) => {
  return (
    <main>
      <CoordinatorsStoreProvider coordinators={coordinators}>
        <SearchPanel
          searchParamName="coordinator_name"
        >
          <Row alignItems="center">
            <AddCoordinator />
          </Row>
        </SearchPanel>
        <ScrollArea className="h-[79vh] w-full p-4">
          <CoordinatorsTable
            totalCount={totalCount}
            perPage={perPage}
            sorterTableObject={sorterTableObject}
          />
        </ScrollArea>
      </CoordinatorsStoreProvider>
    </main>
  );
};

export default Coordinators;
