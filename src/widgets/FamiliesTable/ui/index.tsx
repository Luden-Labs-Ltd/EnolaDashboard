import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@components/shadowCDN/table";
import { useFamiliesStore } from "entities/families";
import React from "react";
import { tableDataConverter } from "../lib";
import { Ceil } from "./Ceil";
import { HeaderCeil } from "./HeaderCeil";

interface FamiliesTableProps {}

const FamiliesTable: React.FC<FamiliesTableProps> = () => {
  const { familiesState } = useFamiliesStore();
  const tableData = tableDataConverter({
    families: familiesState.families,
    selectedFamilies: familiesState.selectedFamilies,
  });
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {tableData.headers.map((header) => (
              <HeaderCeil key={header.id} header={header} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.rows.map((row, index) => {
            return (
              <TableRow key={index}>
                {row.map((ceil) => (
                  <Ceil key={ceil.id} ceil={ceil} />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default FamiliesTable;
