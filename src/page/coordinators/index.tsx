import Row from "@components/Row";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { CoordinatorType } from "entities/users";
import SearchPanel from "features/search-panel";
import React from "react";
import { SorterObject } from "shared/types/sort";
import { CoordinatorsStoreProvider } from "entities/users/model/providerCoordinators";
import CoordinatorsTable from "./ui/CoordinatorsTable";
import { AddCoordinator } from "features/add-coordinator";
import { Program } from "entities/auth/api/types";
import { ProgramFilter } from "./ui/ProgramFilter";


interface CoordinatorsProps {
  coordinators: CoordinatorType[];
  sorterTableObject: SorterObject;
  perPage: number;
  totalCount: number;
  programs: Program[];
}
const Coordinators: React.FC<CoordinatorsProps> = ({
  coordinators,
  sorterTableObject,
  perPage,
  totalCount,
  programs,
}) => {
  return (
    <main>
      <CoordinatorsStoreProvider coordinators={coordinators}>
        <SearchPanel
          searchParamName="coordinator_name"
          filterForm={<ProgramFilter programs={programs} />}
        >
          <Row alignItems="center">
            <AddCoordinator programs={programs} />
          </Row>
        </SearchPanel>
        <ScrollArea className="h-[79vh] w-full p-4">
          <CoordinatorsTable
            totalCount={totalCount}
            perPage={perPage}
            sorterTableObject={sorterTableObject}
            programs={programs}
          />
        </ScrollArea>
      </CoordinatorsStoreProvider>
    </main>
  );
};

export default Coordinators;
