"use client";

import { useFamiliesStore } from "entities/families";
import React, { useCallback } from "react";
import { UniversalTable } from "@widgets/UniversalTable";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { renderCeilDropDownItemsType } from "@widgets/UniversalTable/ui/Ceil";
import { ArchiveFamily } from "features/archive-family";
import { DeleteFamily } from "features/delete-family";
import DeleteIcon from "shared/assets/DeleteIcon";
import ViewIcon from "shared/assets/ViewIcon";
import { useTranslations } from "next-intl";
import { CustomPagination } from "@components/CustomPagination";
import { SorterObject } from "shared/types/sort";
import { useRouter } from "next/navigation";
import { EmptyScreen } from "@components/EmptyScreen";

interface FamiliesTableProps {
  sorterTableObject: SorterObject;
  perPage: number;
  totalCount: number;
}

const FamiliesTable: React.FC<FamiliesTableProps> = ({
  sorterTableObject,
  perPage,
  totalCount,
}) => {
  const t = useTranslations();

  const { familiesState, toggleMainSelect, toggleSelectedFamilies } =
    useFamiliesStore();
  const navigate = useRouter();

  // @ts-ignore
  const renderCeilDropDownItems = useCallback<renderCeilDropDownItemsType>(
    (ceil) => {
      return [
        {
          id: `${ceil.itemId}-view`,
          label: t("Common.view"),
          icon: <ViewIcon />,
          href: `/family/${ceil.itemId}`,
        },
        {
          id: `${ceil.itemId}-delete`,
          label: t("Common.delete"),
          icon: "",
          href: ``,
          renderCustomComponent: (onOpen, onClose) => {
            return (
              <DeleteFamily
                key={`${ceil.itemId}-delete`}
                familyId={String(ceil.itemId)}
                callback={onClose}
              >
                <DropdownMenuItem
                  onClick={onOpen}
                  className={"DropdownMenuItem"}
                >
                  <DeleteIcon />
                  <span>{t("Common.delete")}</span>
                </DropdownMenuItem>
              </DeleteFamily>
            );
          },
        },
        {
          id: `${ceil.itemId}-archive`,
          label: "",
          icon: "",
          href: ``,
          renderCustomComponent: (onOpen, onClose) => {
            const familyId = String(ceil.itemId);
            return (
              <ArchiveFamily
                key={`${ceil.itemId}-archive`}
                familyId={familyId}
                callback={onClose}
              >
                <DropdownMenuItem
                  onClick={onOpen}
                  className={"DropdownMenuItem"}
                >
                  <ArchiveIcon />
                  <span>{t("Families.archive")}</span>
                </DropdownMenuItem>
              </ArchiveFamily>
            );
          },
        },
      ];
    },
    [t]
  );

  if (!familiesState.families) {
    return (
      <div className="flex min-h-[50vh] flex-1 justify-center items-center">
        {t("Common.pleaseCreate", { name: t("Common.families") })}
      </div>
    );
  }

  const onDoubleClickFamilyRow = (familyId: string | null) => {
    navigate.push(`/family/${familyId}`);
  };

  const isScreenEmpty = !familiesState.families.length;
  return (
    <>
      <UniversalTable
        tableName="FamiliesTable"
        tableRawData={familiesState.families}
        sorterObject={sorterTableObject}
        hiddenColumns={["lastSeen"]}
        selectedColumnIds={familiesState.selectedFamilies}
        toggleMainSelect={toggleMainSelect}
        toggleSelectedItems={toggleSelectedFamilies}
        renderCeilDropDownItems={renderCeilDropDownItems}
        onRowDoubleClick={onDoubleClickFamilyRow}
      />

      {isScreenEmpty ? <EmptyScreen screenFor="families" /> : null}

      <div className="mt-4">
        <CustomPagination
          pageSize={perPage}
          totalCount={totalCount}
          pagesToShow={10}
        />
      </div>
    </>
  );
};

export default FamiliesTable;
