import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@components/shadowCDN/table";
import { FamilyType } from "entities/families";
import React from "react";
import { tableDataConverter } from "../lib";
import { Ceil } from "./Ceil";
import { Header } from "./Header";

interface FamiliesTableProps {
  families: FamilyType[];
}

const FamiliesTable: React.FC<FamiliesTableProps> = ({ families }) => {
  const tableData = tableDataConverter(families);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {tableData.headers.map((header) => (
              <Header key={header.id} header={header} />
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
