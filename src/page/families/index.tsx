"use client";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { FamiliesTable } from "@widgets/FamiliesTable";
import { FamiliesStoreProvider, FamilyType } from "entities/families";
import { AddFamily } from "features/add-family";
import { ArchiveFamily } from "features/archive-family";
import SearchPanel from "features/search-panel";
import { useTranslations } from "next-intl";
import React from "react";
import ArchiveIcon from "shared/assets/ArchiveIcon";

interface FamiliesProps {
  families: FamilyType[];
}
const Families: React.FC<FamiliesProps> = ({ families }) => {
  const t = useTranslations();

  return (
    <main>
      <FamiliesStoreProvider families={families}>
        <SearchPanel
          actions={
            <Row>
              <ArchiveFamily>
                <Button withIcon variant={"ghost"}>
                  <ArchiveIcon />
                  <span>{t('Families.archive')}</span>
                </Button>
              </ArchiveFamily>
              <AddFamily />
            </Row>
          }
        />
        <FamiliesTable />
      </FamiliesStoreProvider>
    </main>
  );
};

export default Families;
