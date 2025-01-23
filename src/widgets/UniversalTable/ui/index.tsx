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
import { CeilItem } from "../lib/types";

interface UniversalTableProps {
  tableRawData: any[];
  selectedColumnIds: number[];
  sorterObject?: SorterObject;
  toggleMainSelect: () => void;
  toggleSelectedItems: (id: number) => void;
  renderCeilDropDownItems: renderCeilDropDownItemsType;
  onRowDoubleClick?: (itemId: number | null) => void;
}

const UniversalTable: React.FC<UniversalTableProps> = ({
  tableRawData,
  selectedColumnIds,
  sorterObject,
  toggleMainSelect,
  toggleSelectedItems,
  renderCeilDropDownItems,
  onRowDoubleClick,
}) => {
  const tableData = tableDataConverter({
    tableRawData: tableRawData,
    selectedColumnIds: selectedColumnIds,
  });

  const isIndeterminate =
    selectedColumnIds.length > 0 &&
    selectedColumnIds.length !== tableRawData.length;
  const isChecked = selectedColumnIds.length === tableRawData.length;

  if (!tableRawData.length) {
    return (
      <Table>
        <TableHeader>
          <TableRow></TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
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
        <TableHeader>
          <TableRow>
            {tableData.headers.map((header) => (
              <HeaderCeil
                isChecked={isChecked}
                isIndeterminate={isIndeterminate}
                sorterObject={sorterObject}
                toggleMainSelect={toggleMainSelect}
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
                className={!!onRowDoubleClick ? "cursor-pointer" : ""}
                onDoubleClick={() => onDoubleClickHandler?.(row)}
              >
                {row.map((ceil) => (
                  <Ceil
                    toggleSelectedItems={toggleSelectedItems}
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
