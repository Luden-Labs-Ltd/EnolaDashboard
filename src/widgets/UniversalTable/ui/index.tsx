"use client";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@components/shadowCDN/table";
import React from "react";
import { tableDataConverter } from "../lib";
import { Ceil, renderCeilDropDownItemsType } from "./Ceil";
import { HeaderCeil } from "./HeaderCeil";

interface UniversalTableProps {
  tableRawData: any[],
  selectedColumnIds: number[],
  toggleMainSelect: () => void,
  toggleSelectedItems: (id: number) => void;
  renderCeilDropDownItems: renderCeilDropDownItemsType
}

const UniversalTable: React.FC<UniversalTableProps> = ({
  tableRawData,
  selectedColumnIds,
  toggleMainSelect,
  toggleSelectedItems,
  renderCeilDropDownItems,
}) => {
  const tableData = tableDataConverter({
    tableRawData: tableRawData,
    selectedColumnIds: selectedColumnIds,
  });

  const isIndeterminate = selectedColumnIds.length > 0 && selectedColumnIds.length !== tableRawData.length
  const isChecked = selectedColumnIds.length === tableRawData.length

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {tableData.headers.map((header) => (
              <HeaderCeil isChecked={isChecked} isIndeterminate={isIndeterminate} toggleMainSelect={toggleMainSelect} key={header.id} header={header} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.rows.map((row, index) => {
            return (
              <TableRow key={index}>
                {row.map((ceil) => (
                  <Ceil toggleSelectedItems={toggleSelectedItems} renderCeilDropDownItems={renderCeilDropDownItems} key={ceil.id} ceil={ceil} />
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
