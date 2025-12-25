"use client";

import React, { useCallback } from "react";
import { UniversalTable } from "@widgets/UniversalTable";
import { renderCeilDropDownItemsType } from "@widgets/UniversalTable/ui/Ceil";
import { useTranslations } from "next-intl";
import { CustomPagination } from "@components/CustomPagination";
import { SorterObject } from "shared/types/sort";
import { useRouter } from "next/navigation";
import { EmptyScreen } from "@components/EmptyScreen";
import { useCoordinatorsStore } from "entities/users/model/providerCoordinators";
import { DropdownMenuItem } from "@components/shadowCDN/dropdown-menu";
import DeleteIcon from "shared/assets/DeleteIcon";
import EditIcon from "shared/assets/EditIcon";
import Row from "@components/Row";
import { DeleteCoordinator } from "features/delete-coordinator";
import { EditCoordinator } from "features/edit-coordinator";
import { CoordinatorType } from "entities/users";

interface CoordinatorsTableProps {
  sorterTableObject: SorterObject;
  perPage: number;
  totalCount: number;
}

const CoordinatorsTable: React.FC<CoordinatorsTableProps> = ({
  sorterTableObject,
  perPage,
  totalCount,
}) => {
  const t = useTranslations();

  const { coordinatorsState, toggleMainSelect, toggleSelectedCoordinators } =
    useCoordinatorsStore();
  const navigate = useRouter();

  // @ts-ignore
  const renderCeilDropDownItems = useCallback<renderCeilDropDownItemsType>(
    (ceil) => {
      const coordinator = ceil.itemData as CoordinatorType;
      return [
        {
          id: `${ceil.itemId}-edit`,
          label: t("Common.edit"),
          icon: "",
          href: ``,
          renderCustomComponent: (onOpen, onClose) => {
            return (
              <EditCoordinator
                key={`${ceil.itemId}-edit`}
                coordinator={coordinator}
                callback={onClose}
              >
                <DropdownMenuItem
                  onClick={onOpen}
                  className={"DropdownMenuItem"}
                >
                  <Row alignItems="center" className="gap-[8px]">
                    <EditIcon height={17} width={17} />
                    <span>{t("Common.edit")}</span>
                  </Row>
                </DropdownMenuItem>
              </EditCoordinator>
            );
          },
        },
        {
          id: `${ceil.itemId}-delete`,
          label: t("Common.delete"),
          icon: "",
          href: ``,
          renderCustomComponent: (onOpen, onClose) => {
            return (
              <DeleteCoordinator
                key={`${ceil.itemId}-delete`}
                coordinatorId={ceil.itemId}
                callback={onClose}
              >
                <DropdownMenuItem
                  onClick={onOpen}
                  className={"DropdownMenuItem"}
                >
                  <DeleteIcon />
                  <span>{t("Common.delete")}</span>
                </DropdownMenuItem>
              </DeleteCoordinator>
            );
          },
        },
      ];
    },
    [t]
  );

  if (!coordinatorsState.coordinators) {
    return (
      <div className="flex min-h-[50vh] flex-1 justify-center items-center">
        {t("Common.pleaseCreate", { name: t("Common.coordinators") })}
      </div>
    );
  }

  const onDoubleClickCoordinatorRow = (coordinatorId: number | null) => {
    navigate.push(`/coordinator/${coordinatorId}`);
  };

  const isScreenEmpty = !coordinatorsState.coordinators.length;
  return (
    <>
      <UniversalTable
        tableName="CoordinatorsTable"
        tableRawData={coordinatorsState.coordinators}
        sorterObject={sorterTableObject}
        selectedColumnIds={coordinatorsState.selectedCoordinators}
        toggleMainSelect={toggleMainSelect}
        toggleSelectedItems={toggleSelectedCoordinators}
        renderCeilDropDownItems={renderCeilDropDownItems}
        onRowDoubleClick={onDoubleClickCoordinatorRow}
      />

      {isScreenEmpty ? <EmptyScreen screenFor="coordinators" /> : null}

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

export default CoordinatorsTable;
