"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/shadowCDN/table";
import React from "react";
import { tableDataConverter } from "../lib";
import { Ceil, renderCeilDropDownItemsType } from "./Ceil";
import { HeaderCeil } from "./HeaderCeil";
import { SorterObject } from "shared/types/sort";
import { CeilItem, CeilItemType, HeaderItemType } from "../lib/types";
import { cn } from "@utils";

interface UniversalTableProps {
  tableRawData: any[];
  selectedColumnIds?: string[];
  sorterObject?: SorterObject;
  tableName: string;
  toggleMainSelect?: () => void;
  toggleSelectedItems?: (id: string) => void;
  renderCeilDropDownItems: renderCeilDropDownItemsType;
  onRowDoubleClick?: (itemId: string | null) => void;
  withSelection?: boolean;
}

const UniversalTable: React.FC<UniversalTableProps> = ({
  tableName,
  tableRawData,
  selectedColumnIds,
  sorterObject,
  toggleMainSelect,
  toggleSelectedItems,
  renderCeilDropDownItems,
  onRowDoubleClick,
  withSelection = false,
}) => {
  const tableData = tableDataConverter({
    tableRawData: tableRawData,
    selectedColumnIds: selectedColumnIds ?? [],
    tableName: tableName,
  });

  const isIndeterminate =
    !!(selectedColumnIds && selectedColumnIds.length > 0 &&
    selectedColumnIds.length !== tableRawData.length);
  const isChecked = !!(selectedColumnIds && selectedColumnIds.length === tableRawData.length);

  if (!tableRawData.length) {
    return (
      <Table>
        <TableHeader className="[&_tr]:border-0 border-0">
          <TableRow className="border-0"></TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-0">
            <TableCell>List Empty</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  const onDoubleClickHandler = (row: CeilItem[]) => {
    const lastCeil = row.at(-1);
    onRowDoubleClick?.(lastCeil?.itemId ?? null);
  };

  return (
    <>
      <Table>
        <TableHeader className="[&_tr]:border-0 border-0">
          <TableRow className="border-0">
            {tableData.headers.map((header) => header.type === HeaderItemType.SELECT && !withSelection ? null : (
              <HeaderCeil
                isChecked={isChecked}
                isIndeterminate={isIndeterminate}
                sorterObject={sorterObject}
                toggleMainSelect={toggleMainSelect ?? (() => {})}
                key={header.id}
                header={header}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.rows.map((row, index) => {
            return (
              <TableRow
                key={index}
                className={cn(!!onRowDoubleClick ? "cursor-pointer" : "", "border-0")}
                onDoubleClick={() => onDoubleClickHandler?.(row)}
              >
                {row.map((ceil) => ceil.type === CeilItemType.SELECT && !withSelection ? null : (
                  <Ceil
                    toggleSelectedItems={toggleSelectedItems ?? (() => {})}
                    renderCeilDropDownItems={renderCeilDropDownItems}
                    key={ceil.id}
                    ceil={ceil}
                  />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default UniversalTable;
