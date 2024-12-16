import Row from "@components/Row";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { FamiliesStoreProvider, FamilyType } from "entities/families";
import { AddFamily } from "features/add-family";
import SearchPanel from "features/search-panel";
import { useTranslations } from "next-intl";
import React from "react";
import FamiliesTable from "./ui/FamiliesTable";
import { SearchFilter } from "./ui/SearchFilter/SearchFilter";
interface FamiliesProps {
  families: FamilyType[];
  programId: string;
}
const Families: React.FC<FamiliesProps> = ({ programId, families }) => {
  const t = useTranslations();

  return (
    <main>
      <FamiliesStoreProvider families={families} programId={programId} >
        <SearchPanel
          filterForm={<SearchFilter />}
          searchParamName="family_name"
        >
          <Row>
            {/* <ArchiveFamily>
                  <Button withIcon variant={"ghost"}>
                    <ArchiveIcon />
                    <span>{t("Families.archive")}</span>
                  </Button>
            </ArchiveFamily> */}

            <AddFamily />
          </Row>
        </SearchPanel>
        <ScrollArea className="h-[78vh] w-full border p-4">
          <FamiliesTable />
        </ScrollArea>
      </FamiliesStoreProvider>
    </main>
  );
};

export default Families;
